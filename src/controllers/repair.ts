import { NextFunction, Request, Response } from 'express';
import { handleHttp } from '../utils/error.handle';
import {
    insertRepair,
    getRepairs,
    getRepair,
    updateRepair,
    deleteRepair,
    updatePriceToPay,
    getRepairEmployee,
  } from '../services/repair';
import multer from 'multer';

import fileUpload, { UploadedFile } from 'express-fileupload';
import { uploadImage } from '../config/cloudinary';

const getRepairController = async (req: Request, res: Response) => {
  try {
    const {plate} = req.params;
    const {cc} = req.query;
    const response = await getRepair(plate,Number(cc));
    if(response){
      res.send(response);
    }else{
      res.send('THERE_IS_NO_REPAIR_WITH_THIS_CREDENTIALS')
    }
  } catch (e) {
    handleHttp(res, 'ERROR_GET_REPAIR');
  }
};

const getRepairEmployeeController = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await getRepairEmployee(id);
    res.send(response);
  } catch (e) {
    console.error((e as Error).message); // para registrar el error en el servidor
    handleHttp(res, 'ERROR_GET_REPAIR_EMPLOYEE');
  }
};

const getRepairsController = async (req: Request, res: Response) => {
  try {
    const response = await getRepairs();
    res.send(response);
  } catch (e) {
    handleHttp(res, 'ERROR_GET_REPAIRS');
  }
};

const updateRepairController = async (req: Request, res: Response) => {
  try {
    const { plate,cc } = req.params;
    let updateData = { ...req.body };

    console.log('Before images: ', updateData.beforeImages);
    console.log('After images: ', updateData.afterImages);

    if (req.files) {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      // Upload 'afterImages' if they exist
      if (files.afterImages) {
        const afterImagesFiles = files.afterImages;
        const imageBuffers = afterImagesFiles.map((file) => file.buffer);
        const uploadResults = await Promise.all(
          imageBuffers.map((buffer) => uploadImage(buffer, 'afterImages')),
        );
        updateData.afterImages = uploadResults.map((result) => result.secure_url);
      }

      // Upload 'beforeImages' if they exist
      if (files.beforeImages) {
        // Process 'beforeImages' as needed
        const beforeImages = files.beforeImages;
        const beforeImagesBuffers = beforeImages.map((file) => file.buffer);
        const uploadResults = await Promise.all(
            beforeImagesBuffers.map((buffer) => uploadImage(buffer, 'beforeImages')),
        );
        // Assume you have a field in your model to store these URLs
        updateData.beforeImages = uploadResults.map((result) => result.secure_url);
      }
    }

    const response = await updateRepair(plate,Number(cc), updateData);
    res.send(response);
  } catch (e) {
    handleHttp(res, 'ERROR_UPDATE_REPAIR');
  }
};

const postRepairController = async (req: Request, res: Response) => {
  try {
    let beforeImagesBuffers: Buffer[] = [];

    if (req.files) {
      const uploadedFiles = req.files as Express.Multer.File[];
      beforeImagesBuffers = uploadedFiles.map((file) => file.buffer);
    }

    if (typeof req.body.parts === 'string') {
      try {
        req.body.parts = JSON.parse(req.body.parts);
      } catch (e) {
        return res.status(400).send('INVALID_PARTS_FORMAT');
      }
    }

    console.log('Este es el body', req.body);

    const response = await insertRepair(req.body, beforeImagesBuffers);
    if (typeof response === 'string') {
      return res.status(400).send({ message: response });
    }
    res.send(response);
  } catch (e) {
    console.error(e);
    handleHttp(res, 'ERROR_POST_REPAIR');
  }
};

const deleteRepairController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const repairId = req.params.id;

    if (!repairId) {
      return res.status(400).json({ message: 'Repair ID is required' });
    }

    const response = await deleteRepair(repairId);
    res.send(response);
  } catch (error) {
    console.error(error);
    handleHttp(res, 'ERROR_DELETE_REPAIR');
  }
};

export {
    getRepairController,
    getRepairEmployeeController,
    getRepairsController,
    updateRepairController,
    postRepairController,
    deleteRepairController,
};
