import { Vehicle } from '../interfaces/vehicle';
import vehicleModel from '../models/vehicle';

const getVehl = async (plate: string) => {
    const responseVehicle = await vehicleModel.find({ plate: plate });
    return responseVehicle;
  };

  export { getVehl };