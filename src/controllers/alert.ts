import { Request, Response, response } from "express"
import { handleHttp } from "../utils/error.handle"
import{insertAlert, getAlerts, deleteAlert} from "../services/alert"

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

const deleteAlertController = async ({params}:Request, res: Response)=> {
    try{
        const {id} = params;
        const responseDelete = await deleteAlert(id);
        res.send(responseDelete);
    }catch (e){
        handleHttp(response,'ERROR_DELETE_ALERT')
    }
}


export {getAlertsController, postAlertController, deleteAlertController};