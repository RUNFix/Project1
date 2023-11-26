import { Request, Response, Router } from 'express';
import {
  getRepairController,
  getRepairEmployeeController,
  getRepairsController,
  getRepairByIdController,
  getRepairsByPlate_CcController,
  updateRepairController,
  postRepairController,
  deleteRepairController,
} from '../controllers/repair';
import { logMiddleware } from '../middleware/log';
import fileUpload from 'express-fileupload';
import multer from 'multer';

const router = Router();

const storage = multer.memoryStorage(); // Store uploaded files in memory
const upload = multer({ storage: storage });

router.get('/', getRepairsController);
router.get('/:plate', logMiddleware, getRepairController); //example: GET http://localhost:4000//abc123?cc=777
router.get('/history/:plate', getRepairsByPlate_CcController); //example: GET http://localhost:4000//history/abc123?cc=777
router.get('/id/:id', getRepairByIdController); //example: GET http://localhost:4000/repair/id/65482b1671ec5ebe128f138d
router.get('/employee/:id', getRepairEmployeeController);
router.post('/', upload.array('beforeImages'), postRepairController);

router.put(
  '/:plate',
  upload.fields([{ name: 'beforeImages' }, { name: 'afterImages' }]),
  updateRepairController,
);
router.patch(
  '/update/:plate/:cc',
  upload.fields([{ name: 'afterImages' }]),
  updateRepairController,
);



router.delete('/:id', deleteRepairController);

export { router };
