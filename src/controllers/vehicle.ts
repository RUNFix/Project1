import { NextFunction, Request, Response } from 'express';
import { handleHttp } from '../utils/error.handle';
import {
  insertveh,
  deleteVeh,
  getVechls,
  getVehl,
  updateVeh
} from '../services/vehicle';
import multer from 'multer';

import fileUpload, { UploadedFile } from 'express-fileupload';
import { uploadImage } from '../config/cloudinary';

const getVehicle = async ({ params }: Request, res: Response) => {
  try {
    const { plate } = params;
    const response = await getVehl(plate);
    res.send(response);
  } catch (e) {
    handleHttp(res, 'ERROR_GET_VEHICLE');
  }
};

//Al igual que pasó con el servicio, esto pasa a ser de repair
// const getVehiclePEmployee = async ({ params }: Request, res: Response) => {
//   try {
//     const { id } = params;
//     const response = await getVechlpemployee(id);
//     res.send(response);
//   } catch (e) {
//     console.error((e as Error).message); // para registrar el error en el servidor
//     handleHttp(res, 'ERROR_GET_VEHICLE');
//   }
// };

const getVehicles = async (req: Request, res: Response) => {
  try {
    const response = await getVechls();
    res.send(response);
  } catch (e) {
    handleHttp(res, 'ERROR_GET_VEHICLES');
  }
};

const updateVehicle = async (req: Request, res: Response) => {
  try {
    const { plate } = req.params;
    let updateData = { ...req.body };

    console.log('DATOS', updateData.images);
    //console.log('Fixed', updateData.imagesFixed);

    if (req.files) {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      // Upload 'imagesFixed' if they exist
      // if (files.imagesFixed) {
      //   const imagesFixedFiles = files.imagesFixed;
      //   const imageBuffers = imagesFixedFiles.map((file) => file.buffer);
      //   const uploadResults = await Promise.all(
      //     imageBuffers.map((buffer) => uploadImage(buffer, 'imagesFixed')),
      //   );
      //   updateData.imagesFixed = uploadResults.map((result) => result.secure_url);
      // }

      // Upload 'images' if they exist
      if (files.images) {
        // Process 'images' as needed
        const images = files.images;
        const imageBuffers = images.map((file) => file.buffer);
        const uploadResults = await Promise.all(
          imageBuffers.map((buffer) => uploadImage(buffer, 'images')),
        );
        // Assume you have a field in your model to store these URLs
        updateData.images = uploadResults.map((result) => result.secure_url);
      }
    }

    const response = await updateVeh(plate, updateData);
    res.send(response);
  } catch (e) {
    handleHttp(res, 'ERROR_UPDATE_VEHICLE');
  }
};

const postVehicle = async (req: Request, res: Response) => {
  try {
    let imageBuffers: Buffer[] = [];

    if (req.files) {
      const uploadedFiles = req.files as Express.Multer.File[];
      imageBuffers = uploadedFiles.map((file) => file.buffer);
    }

    if (typeof req.body.parts === 'string') {
      try {
        req.body.parts = JSON.parse(req.body.parts);
      } catch (e) {
        return res.status(400).send('INVALID_PARTS_FORMAT');
      }
    }

    console.log('Este es el body', req.body);

    const response = await insertveh(req.body, imageBuffers);
    if (typeof response === 'string') {
      return res.status(400).send({ message: response });
    }
    res.send(response);
  } catch (e) {
    console.error(e);
    handleHttp(res, 'ERROR_POST_VEHICLE');
  }
};

const deleteVehicle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const vehicleId = req.params.id;

    if (!vehicleId) {
      return res.status(400).json({ message: 'Vehicle ID is required' });
    }

    const response = await deleteVeh(vehicleId);
    res.send(response);
  } catch (error) {
    console.error(error);
    handleHttp(res, 'ERROR_DELETE_VEHICLE');
  }
};

export {
  getVehicle,
  getVehicles,
  updateVehicle,
  postVehicle,
  deleteVehicle
};
