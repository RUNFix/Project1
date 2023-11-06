import { response } from "express";
import AlertModel from "../models/alert";
import { Alert } from "../interfaces/alert";

const insertAlert = async (alert: Alert) => {
    const responseInsert = await AlertModel.create(alert);
    return responseInsert;
}

const getAlerts = async () => {
    const responseGet = await AlertModel.find({});
    return responseGet;
}

const deleteAlert = async (id:string) => {
    const responseGet = await AlertModel.findOneAndDelete({_id:id});
    return responseGet;
}


export {insertAlert, getAlerts, deleteAlert};