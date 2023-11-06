import { Request, Response, Router } from 'express';
import {
    getRepairController,
    getRepairEmployeeController,
    getRepairsController,
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
router.get('/:plate', logMiddleware, getRepairController);//example: GET /your-endpoint/abc123?cc=777
router.get('/employee/:id', getRepairEmployeeController);
router.post('/', upload.array('beforeImages'), postRepairController);

router.put(
  '/:plate',
  upload.fields([{ name: 'beforeImages' }, { name: 'afterImages' }]),
  updateRepairController,
);

router.delete('/:id', deleteRepairController);

export { router };
