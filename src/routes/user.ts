import { Request, Response, Router } from 'express';
const router = Router();
import { getVehicle, updateVehicle } from '../controllers/vehicle';
import { logMiddleware } from '../middleware/log';

router.get('/:plate', logMiddleware, getVehicle);
router.put('/:plate', updateVehicle);

export { router };
