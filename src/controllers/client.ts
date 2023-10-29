import e, { Request, Response, response } from "express"
import { handleHttp } from "../utils/error.handle"
import {insertClient, getClients, getClient, updateClient, deleteClient} from "../services/client"

const getClientController = async ({params}:Request, res: Response)=> {
    try{
        const {cc} = params;
        if(Number.isNaN(cc)) throw new Error("NOT_VALID_CC_UPDATE");
        const responseGet = await getClient(Number(cc));
        const data = responseGet ? responseGet : "CLIENT_NOT_FOUND"
        res.send(data);
    }catch (e){
        handleHttp(res,'ERROR_GET_CLIENT',e)
    }
}

const getClientsController = async (req:Request, res: Response)=> {
    try{
        const responseGet = await getClients();
        res.send(responseGet);
    }catch (e){
        handleHttp(res,'ERROR_GET_CLIENTS',e)
    }
}

const postClientController = async ({body}:Request, res: Response)=> {
    try{
        const {cc} = body;
        const checkIs = await getClient(cc);
        if(checkIs) throw new Error("ALREADY_CLIENT");

        const responseClient = await insertClient(body);
        res.status(200).send({ message: "CLIENT_CREATED",body:responseClient});
    }catch (e){
        handleHttp(res,'ERROR_POST_CLIENT',e)
    }
}

const updateClientController = async ({params, body}:Request, res: Response)=> {
    try{
        const {cc} = params;
        if(Number.isNaN(cc)) throw new Error("NOT_VALID_CC_UPDATE");
        const responseUpdate = await updateClient(Number(cc),body);
        res.send(responseUpdate);
    }catch (e){
        handleHttp(response,'ERROR_UPDATE_CLIENT',e)
    }
}

const deleteClientController = async ({params}:Request, res: Response)=> {
    try{
        const {cc}=params;
        if(Number.isNaN(cc)) throw new Error("NOT_VALID_CC_DELETE");
        const responseDelete = await deleteClient(Number(cc));
        if(responseDelete){
            res.send("SUCCESSFULLY_DELETED");
        }else{res.send("CLIENT_NOT_FOUND");}
    }catch (e){
        handleHttp(response,'ERROR_DELETE_CLIENT',e)
    }
}

export { getClientController, getClientsController,  postClientController, updateClientController, deleteClientController}