import ClientModel from "../models/client";
import { Client } from "../interfaces/client";

const insertClient = async (item:Client)=>{
    const checkIs = await ClientModel.findOne({cc: item.cc});
    if (checkIs) return "ALREADY_CLIENT";

    const responseClient = await ClientModel.create(item);
    return responseClient;
}

const getClients = async ()=>{
    const responseGet = await ClientModel.find({});
    return responseGet;
}

const getClient = async (cc:number)=>{
    const responseGet = await ClientModel.findOne({cc:cc});
    return responseGet;
}

const updateClient = async (cc:number, data: Partial<Client>) => {
    const responseUpdate = await ClientModel.findOneAndUpdate({cc:cc},{$set:data},{new:true});
    return responseUpdate;
}

const deleteClient = async (cc:number) => {
    const responseDelete = await ClientModel.findOneAndDelete({cc:cc});
    return responseDelete;
}

export {insertClient, getClients, getClient, updateClient, deleteClient}