import { NextFunction, Request, Response } from 'express';
import { handleHttp } from '../utils/error.handle';
import {
    insertRepair,
    getRepairs,
    getRepair,
    getRepairById,
    getRepairsByPlate_Cc,
    updateRepair,
    deleteRepair,
    getRepairEmployee,
  } from '../services/repair';
import multer from 'multer';

import fileUpload, { UploadedFile } from 'express-fileupload';
import { uploadImage } from '../config/cloudinary';
import repairModel from '../models/repair';

const getRepairsByPlate_CcController = async (req: Request, res: Response) => {
  try {
    const {plate} = req.params;
    const {cc} = req.query;
    const response = await getRepairsByPlate_Cc(plate,Number(cc));
    if(response){
      res.send(response);
    }else{
      res.send('THERE_IS_NO_REPAIRS_WITH_THIS_CREDENTIALS')
    }
  } catch (e) {
    handleHttp(res, 'ERROR_GET_REPAIRS');
  }
};

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

const getRepairByIdController = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const response = await getRepairById(id);
    if(response){
      res.send(response);
    }else{
      res.send('THERE_IS_NO_REPAIR_WITH_THIS_ID')
    }
  } catch (e) {
    handleHttp(res, 'ERROR_GET_REPAIR_BY_ID');
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
    const { plate, cc } = req.params;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // Recuperar el registro actual de la base de datos
    const currentRepair = await repairModel.findOne({ plate, cc });

    if (!currentRepair) {
      return res.status(404).send('Repair not found');
    }

    // Obtener el arreglo actual de afterImages
    let afterImagesUpdate = currentRepair.afterImages || [];

    if (files && files.afterImages) {
      const uploadPromises = files.afterImages.map((file) => {
        return file ? uploadImage(file.buffer, 'afterImages') : Promise.resolve(null);
      });

      const uploadResults = await Promise.all(uploadPromises);
      uploadResults.forEach((result) => {
        if (result && afterImagesUpdate.length < 12) {
          afterImagesUpdate.push(result.secure_url); // Agregar solo si hay menos de 12 imágenes
        }
      });
    }

    // Preparar los datos para la actualización
    let updateData = {
      ...req.body,
      afterImages: afterImagesUpdate,
    };

    // Actualizar el registro en la base de datos
    const updatedRepair = await updateRepair(plate, Number(cc), updateData);

    res.send(updatedRepair);
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
    getRepairByIdController,
    getRepairsByPlate_CcController,
    updateRepairController,
    postRepairController,
    deleteRepairController,
};
