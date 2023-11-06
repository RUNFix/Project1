import { Repair } from '../interfaces/repair';
import repairModel from '../models/repair';
import { uploadImage, deleteImage } from '../config/cloudinary';
import employee from '../models/employee';

/**
 * 
 * @param repair repair object
 * @param bImageBuffers images before repair
 * @returns 
 */
const insertRepair = async (
  repair: Repair,
  bImageBuffers?: Buffer[],
): Promise<Repair | string> => {
  try {
    const checkIsEmp = await employee.findOne({ cc: repair.employee });
    if (!checkIsEmp) return 'EMPLOYEE_NOT_FOUND';

    if (bImageBuffers) {
      const results = await Promise.all(
        bImageBuffers.map((buffer) => uploadImage(buffer, 'images')),
      );
      repair.beforeImages = results.map((result) => result.secure_url);
    }

    const responseInsert = await repairModel.create(repair);
    return responseInsert;
  } catch (error) {
    console.error('Error in insertRepair:', error);
    throw new Error('INSERT_REPAIR_FAILED');
  }
};

const getRepairEmployee = async (id: string) => {
  const intIdEmployee = +id;
  if (isNaN(intIdEmployee)) {
    throw new Error('Invalid ID format');
  }
  const responseRepair = await repairModel.find({ employee: id });
  return responseRepair;
};

const getRepairs = async () => {
  const responseRepair = await repairModel.find({});
  return responseRepair;
};

const getRepair = async (plate: string, cc:number) => {
  const responseRepair = await repairModel.findOne({ plate: plate , cc: cc});
  return responseRepair;
};

const updateRepair = async (plate: string, cc: number, data: Repair) => {
  const responseRepair = await repairModel.findOneAndUpdate({ plate: plate, cc: cc }, data, {
    new: true,
  });
  return responseRepair;
};

/**
 * 
 * @param plate plate of the repair to update
 * @param cc cc of the repair to update
 * @param total Total ammount to update
 * @param mode If 1 (add) or -1(rest)
 * @returns if succesful the updated "vehicle", if failed "null"
 */
const updatePriceToPay = async (plate: string, cc: number, total: number, mode: -1 | 1) => {
  const responseRepair: Repair | null = await getRepair(plate,cc);

  if (responseRepair !== null) {
    responseRepair.priceToPay += total * mode;
    const resUpdateVeh = await updateRepair(plate, cc, responseRepair);
    return responseRepair;
  } else {
    //failed to update vehicle
    return null;
  }
};

const deleteRepair = async (id: string): Promise<Repair | null> => {
  const repair = await repairModel.findById(id);

  if (!repair) {
    throw new Error('Vehicle not found');
  }

  if (repair.beforeImages) {
    const deletePromises = repair.beforeImages.map((image) => {
      const publicId = extractPublicIdFromUrl(image);
      return deleteImage(publicId);
    });

    
    await Promise.all(deletePromises);
  }

  if (repair.afterImages) {
    const deletePromises = repair.afterImages.map((image) => {
      const publicId = extractPublicIdFromUrl(image);
      return deleteImage(publicId);
    });

    
    await Promise.all(deletePromises);
  }

  await repair.deleteOne({ _id: id });
  return repair;
};

// Función auxiliar para extraer el publicId de una URL de Cloudinary
function extractPublicIdFromUrl(url: string): string {
  return url.split('/').slice(-1)[0].split('.')[0];
}
export {
  insertRepair,
  getRepairs,
  getRepair,
  updateRepair,
  deleteRepair,
  updatePriceToPay,
  getRepairEmployee,
};
