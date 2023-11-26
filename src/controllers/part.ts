import { Request, Response, response } from "express"
import { handleHttp } from "../utils/error.handle"
import {insertPart, getParts, getPart, updatePart, deletePart} from "../services/part"

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

/* const getPartsController = async (req: Request, res: Response) => {
    try {
        const parts = await PartModel.find();
        res.json(parts);
    } catch (error) {
        handleHttp(res, 'ERROR_GET_PARTS', error);
    }
}; */

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

const deletePartController = async ({params}:Request, res: Response)=> {
    try{
        const {id} = params;
        const responseDelete = await deletePart(id);
        res.send(responseDelete);
    }catch (e){
        handleHttp(response,'ERROR_DELETE_PART')
    }
}

export {postPartController, getPartsController, getPartController, updatePartController, deletePartController}