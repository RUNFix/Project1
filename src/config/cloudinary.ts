var cloudinary = require('cloudinary').v2;
import { Readable } from 'stream';
import { updateBill } from '../services/bill';

cloudinary.config({
  cloud_name: <string>process.env.CLOUDINARY_CLOUD_NAME,
  api_key: <string>process.env.CLOUDINARY_API_KEY,
  api_secret: <string>process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const uploadImage = async (input: string | Buffer, folder: string) => {
  let uploadConfig: any = { folder: `RUNFIXvehicles/${folder}` };
  if (input instanceof Buffer) {
    const dataURL = `data:image/png;base64,${input.toString('base64')}`;
    uploadConfig.resource_type = 'image';
    return await cloudinary.uploader.upload(dataURL, uploadConfig);
  } else {
    return await cloudinary.uploader.upload(input, uploadConfig);
  }
};

export const deleteImage = async (publicId: any) => {
  return await cloudinary.uploader.destroy(publicId);
};
