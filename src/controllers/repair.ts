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
    const originalAfterImages = req.body.originalAfterImages || [];

    // Actualiza las imágenes nuevas si se proporcionan
    let afterImagesUpdate = originalAfterImages.slice(0, 3); // Comienza con las imágenes originales
    if (files && files.afterImages) {
      const uploadPromises = files.afterImages.map((file, index) => {
        if (file) { // Solo procesar si se proporcionó un archivo
          return uploadImage(file.buffer, 'afterImages');
        }
        return Promise.resolve(null); // No hay archivo para este índice
      });

      const uploadResults = await Promise.all(uploadPromises);
      uploadResults.forEach((result, index) => {
        if (result) {
          afterImagesUpdate[index] = result.secure_url; // Reemplaza con la nueva URL si la carga fue exitosa
        }
      });
    }

    // Llama a la función que actualiza la base de datos
    const updatedRepair = await updateRepair(plate, Number(cc), {
      ...req.body, // Incluye otros campos que se puedan haber enviado
      afterImages: afterImagesUpdate // Arreglo actualizado de imágenes
    });

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
