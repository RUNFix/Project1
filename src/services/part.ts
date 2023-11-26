import PartModel from "../models/part";
import { Part } from "../interfaces/part";
import { uploadImage, deleteImage } from '../config/cloudinary';

const insertPart =async (part: Part, ImageBuffer: Buffer,): Promise<Part | string> => {
    try{
        if (ImageBuffer) {
            const results = await uploadImage(ImageBuffer, 'alerts') 
            part.image = results.secure_url;
          }

        const responseInsert = await PartModel.create(part);
        return responseInsert;
    }catch (error){
        console.error('PART_INSERT_ERROR', error);
        throw new Error ('INSERT_PART_FAILED')
    }
}

const getParts = async () => {
    const responseGet = await PartModel.find({});
    return responseGet;
}

const getPart = async (id: string) => {
    const responseGet = await PartModel.findOne({_id:id});
    return responseGet;
}

const updatePart = async (id:string, data: Partial<Part>) => {
    const responseUpdate = await PartModel.findOneAndUpdate({_id:id},{$set:data},{new:true});
    return responseUpdate;
}

const deletePart = async (id:string) => {
    const responseDelete = await PartModel.findOneAndDelete({_id:id});
    return responseDelete;
}

const updatePartFields = async (id: string, updateFields: Partial<Part>) => {
  try {
    const responseUpdate = await PartModel.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true },
    );

    return responseUpdate;
  } catch (error) {
    console.error('PART_UPDATE_ERROR', error);
    throw new Error('UPDATE_PART_FAILED');
  }
};


export { insertPart, getParts, getPart, updatePart, deletePart, updatePartFields };