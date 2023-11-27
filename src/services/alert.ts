import { response } from "express";
import AlertModel from "../models/alert";
import { Alert } from "../interfaces/alert";
import { uploadImage, deleteImage } from '../config/cloudinary';

const insertAlert = async (alert: Alert) => {
    const responseInsert = await AlertModel.create(alert);
    return responseInsert;
}

const insertAlertWithImage =async (alert: Alert, ImageBuffer: Buffer,): Promise<Alert | string> => {
    try{
        if (ImageBuffer) {
            const results = await uploadImage(ImageBuffer, 'alerts') 
            alert.imageLink = results.secure_url;
           
          }
        const responseInsert = await AlertModel.create(alert);
        return responseInsert;
    }catch (error){
        console.error('ALERT_IMAGE_INSERT ERROR', error);
        throw new Error ('INSERT_ALERT_IMAGE_FAILED')
    }
}

const getAlerts = async () => {
    const responseGet = await AlertModel.find({});
    return responseGet;
}

const deleteAlert = async (id:string) => {
    const responseGet = await AlertModel.findOneAndDelete({_id:id});
    return responseGet;
}


export {insertAlert, insertAlertWithImage, getAlerts, deleteAlert,};