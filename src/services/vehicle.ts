import { Vehicle } from "../interfaces/vehicle";
import vehicleModel from "../models/vehicle";
import { uploadImage, deleteImage } from "../config/cloudinary";
import fs from "fs-extra";
import employee from "../models/employee";

const insertveh = async (vehicle: Vehicle, tempFilePaths?: string[]) => {
  const checkIs = await vehicleModel.findOne({ plate: vehicle.plate });
  if (checkIs) return "ALREADY_VEHICLE";

  const checkIsEmp = await employee.findOne({
    fullName: vehicle.employee,
  });
  if (!checkIsEmp) return "EMPLOYEE_NOT_FOUND";

  //TODO: checkIsClient: Check if client does exist

  if (tempFilePaths) {
    const results = await Promise.all(tempFilePaths.map(uploadImage));
    vehicle.images = results.map((result) => result.secure_url);
    await Promise.all(tempFilePaths.map((filePath) => fs.unlink(filePath)));
    const responseInsert = await vehicleModel.create(vehicle);

    return responseInsert;
  }
};

const getVechls = async () => {
  const responseEmployee = await vehicleModel.find({});
  return responseEmployee;
};

const getVehl = async (id: string) => {
  const responseEmployee = await vehicleModel.findOne({ _id: id });
  return responseEmployee;
};

const updateVeh = async (id: string, data: Vehicle) => {
  const responseEmployee = await vehicleModel.findOneAndUpdate(
    { id: id },
    data,
    { new: true }
  );
  return responseEmployee;
};

const deleteVeh = async (id: string): Promise<Vehicle | null> => {
  const vehicle = await vehicleModel.findById(id);

  if (!vehicle) {
    throw new Error("Vehicle not found");
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
  return url.split("/").slice(-1)[0].split(".")[0];
}
export { insertveh, getVechls, getVehl, updateVeh, deleteVeh };
