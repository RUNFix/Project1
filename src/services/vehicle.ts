import { Vehicle } from '../interfaces/vehicle';
import vehicleModel from '../models/vehicle';
import { uploadImage, deleteImage } from '../config/cloudinary';
import fs from 'fs-extra';
import employee from '../models/employee';

import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

const insertveh = async (
  vehicle: Vehicle,
  imageBuffers?: Buffer[],
): Promise<Vehicle | string> => {
  try {
    const checkIs = await vehicleModel.findOne({ plate: vehicle.plate });
    if (checkIs) return 'ALREADY_VEHICLE';

    const checkIsEmp = await employee.findOne({ cc: vehicle.employee });
    if (!checkIsEmp) return 'EMPLOYEE_NOT_FOUND';

    // TODO: Implement a check for client existence.

    if (imageBuffers) {
      const results = await Promise.all(imageBuffers.map(uploadImage));
      vehicle.images = results.map((result) => result.secure_url);
    }

    const responseInsert = await vehicleModel.create(vehicle);
    return responseInsert;
  } catch (error) {
    console.error('Error in insertveh:', error);
    throw new Error('INSERT_VEHICLE_FAILED');
  }
};

const getVechlpemployee = async (id: string) => {
  const intIdEmployee = +id;
  if (isNaN(intIdEmployee)) {
    throw new Error('Invalid ID format');
  }
  const responseVehicle = await vehicleModel.find({ employee: id });
  return responseVehicle;
};

const getVechls = async () => {
  const responseVehicle = await vehicleModel.find({});
  return responseVehicle;
};

const getVehl = async (plate: string) => {
  const responseVehicle = await vehicleModel.findOne({ plate: plate });
  return responseVehicle;
};

const updateVeh = async (plate: string, data: Vehicle) => {
  const responseVehicle = await vehicleModel.findOneAndUpdate({ plate: plate }, data, {
    new: true,
  });
  return responseVehicle;
};

/**
 *
 * @param plate Plate of the vehicle to update
 * @param total Total ammount to update
 * @param mode If 1 (add) or -1(rest)
 * @returns if succesful the updated "vehicle", if failed "null"
 */
const updatePriceToPay = async (plate: string, total: number, mode: -1 | 1) => {
  const responseVehicle: Vehicle | null = await getVehl(plate);

  if (responseVehicle !== null) {
    responseVehicle.priceToPay += total * mode;
    const resUpdateVeh = await updateVeh(plate, responseVehicle);
    return responseVehicle;
  } else {
    //failed to update vehicle
    return null;
  }
};

const deleteVeh = async (id: string): Promise<Vehicle | null> => {
  const vehicle = await vehicleModel.findById(id);

  if (!vehicle) {
    throw new Error('Vehicle not found');
  }

  if (vehicle.images) {
    const deletePromises = vehicle.images.map((image) => {
      const publicId = extractPublicIdFromUrl(image);
      return deleteImage(publicId);
    });

    await Promise.all(deletePromises);
  }

  await vehicle.deleteOne({ _id: id });
  return vehicle;
};

// Función auxiliar para extraer el publicId de una URL de Cloudinary
function extractPublicIdFromUrl(url: string): string {
  return url.split('/').slice(-1)[0].split('.')[0];
}
export {
  insertveh,
  getVechls,
  getVehl,
  updateVeh,
  deleteVeh,
  updatePriceToPay,
  getVechlpemployee,
};
