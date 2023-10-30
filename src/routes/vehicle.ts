import { Request, Response, Router } from 'express';
import {
  getVehicle,
  getVehicles,
  updateVehicle,
  postVehicle,
  deleteVehicle,
  getVehiclePEmployee,
} from '../controllers/vehicle';
import { logMiddleware } from '../middleware/log';
import fileUpload from 'express-fileupload';
import multer from 'multer';

const router = Router();

const storage = multer.memoryStorage(); // Store uploaded files in memory
const upload = multer({ storage: storage });

router.get('/', getVehicles);
router.get('/:plate', logMiddleware, getVehicle);
router.get('/employee/:id', getVehiclePEmployee);
router.post('/', upload.array('images'), postVehicle);

router.put(
  '/:plate',
  upload.fields([{ name: 'images' }, { name: 'imagesFixed' }]),
  updateVehicle,
);

router.delete('/:id', deleteVehicle);

export { router };
