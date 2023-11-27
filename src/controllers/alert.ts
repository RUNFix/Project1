import { Request, Response, response } from "express"
import { handleHttp } from "../utils/error.handle"
import{insertAlert, insertAlertWithImage, getAlerts, deleteAlert} from "../services/alert"

const getAlertsController = async (req:Request, res: Response) => {
    try{
        const responseGet = await getAlerts();
        res.send(responseGet);
    }catch (e){
        handleHttp(response,'ERROR_GET_ALERTS')
    }
}

const postAlertController = async ({body}:Request, res: Response)=> {
    try{
        const responseItem = await insertAlert(body)
        res.send(responseItem);
        
    }catch (e){
        handleHttp(res,"ERROR_POST_ALERT",e);
    }
}

const postAlertImageController = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const file = req.file as Express.Multer.File; // Nota el uso de req.file aquí
    let imageBuffer: Buffer = Buffer.from([]);

    if (file) {
      imageBuffer = file.buffer;
    }

    const responseItem = await insertAlertWithImage(body, imageBuffer);
    res.send(responseItem);
  } catch (e) {
    handleHttp(res, 'ERROR_POST_ALERT_IMAGE', e);
  }
};


const deleteAlertController = async ({params}:Request, res: Response)=> {
    try{
        const {id} = params;
        const responseDelete = await deleteAlert(id);
        res.send(responseDelete);
    }catch (e){
        handleHttp(response,'ERROR_DELETE_ALERT')
    }
}


export {getAlertsController, postAlertController, postAlertImageController, deleteAlertController};