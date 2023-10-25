import { NextFunction, Request, Response } from 'express';
import { handleHttp } from '../utils/error.handle';
import { getVehl } from '../services/user';

const getVehicle = async ({ params }: Request, res: Response) => {
    try {
      const { plate } = params;
      const response = await getVehl(plate);
      res.send(response);
    } catch (e) {
      handleHttp(res, 'ERROR_GET_VEHICLE');
    }
  };

  export { getVehicle };