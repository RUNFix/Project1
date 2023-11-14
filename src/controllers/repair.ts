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
    let updateData = { ...req.body };

    // Asegúrate de que 'req.files' se trata como un objeto con claves de campo que son arrays de archivos
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    if (files && files.afterImages) {
      // 'afterImages' se trata ahora como un array de archivos
      const afterImagesFiles = files.afterImages;
      const uploadResults = await Promise.all(
        afterImagesFiles.map(file => uploadImage(file.buffer, 'afterImages'))
      );
      updateData.afterImages = uploadResults.map(result => result.secure_url);
    } else {
      // Si no hay archivos nuevos, manejar las URLs existentes de las imágenes
      updateData.afterImages = req.body.afterImages; // Estas deberían ser las URLs existentes
    }

    // Actualiza la reparación en la base de datos
    const response = await updateRepair(plate, Number(cc), updateData);
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
    getRepairByIdController,
    getRepairsByPlate_CcController,
    updateRepairController,
    postRepairController,
    deleteRepairController,
};
