import { Request, Response, Router } from "express";
import multer from 'multer';
import {getAlertsController, postAlertController, postAlertImageController, deleteAlertController} from "../controllers/alert";
const router = Router();

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.get('/', getAlertsController);
router.post("/", postAlertController);
router.post("/image",upload.single('alertImage'), postAlertImageController);
router.delete('/:id', deleteAlertController);

export {router};