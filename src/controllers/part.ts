import { Request, Response, response } from "express"
import { handleHttp } from "../utils/error.handle"
import {
  insertPart,
  getParts,
  getPart,
  updatePart,
  deletePart,
  updatePartFields,
} from '../services/part';
import { uploadImage } from "../config/cloudinary";

const postPartController = async (req:Request, res: Response)=> {
    try{
        const {body, files} = req
        let imageBuffer: Buffer = Buffer.from([])
        if (files) {
            const uploadedFiles = files as Express.Multer.File[];
            imageBuffer = uploadedFiles[0].buffer;
        }
        const responseItem = await insertPart(body,imageBuffer)
        res.send(responseItem);
        
    }catch (e){
        handleHttp(res,"ERROR_POST_PART",e);
    }
}

const getPartsController = async (req:Request, res: Response) => {
    try{
        const responseGet = await getParts();
        res.send(responseGet);
    }catch (e){
        handleHttp(response,'ERROR_GET_PARTS')
    }
}



const getPartController = async ({params}:Request, res: Response) => {
    try{
        const {id} = params;
        const responseGet = await getPart(id);
        res.send(responseGet);
    }catch (e){
        handleHttp(response,'ERROR_GET_PART')
    }
}

const updatePartController = async ({ params, body }: Request, res: Response) => {
    try {
      const { id } = params;
      const response = await updatePart(id, body);
      res.send(response);
    } catch (e) {
      handleHttp(res, 'ERROR_UPDATE_PART');
    }
}


const patchPartController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let updateFields = req.body;

    // Verifica si req.files es un arreglo y contiene al menos un archivo
    if (Array.isArray(req.files) && req.files.length > 0) {
      const imageBuffer = req.files[0].buffer;
      const imageResults = await uploadImage(imageBuffer, 'parts');
      updateFields.image = imageResults.secure_url;
    }

    if (!id || Object.keys(updateFields).length === 0) {
      return res.status(400).send({ message: 'ID or update fields not provided' });
    }

    const updatedPart = await updatePartFields(id, updateFields);

    if (!updatedPart) {
      return res.status(404).send({ message: 'Part not found' });
    }

    res.send(updatedPart);
  } catch (e) {
    handleHttp(res, 'ERROR_PATCH_PART', e);
  }
};


const deletePartController = async ({params}:Request, res: Response)=> {
    try{
        const {id} = params;
        const responseDelete = await deletePart(id);
        res.send(responseDelete);
    }catch (e){
        handleHttp(response,'ERROR_DELETE_PART')
    }
}

export {
  postPartController,
  getPartsController,
  getPartController,
  updatePartController,
  deletePartController,
  patchPartController,
};