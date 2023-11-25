import {postPartController, getPartsController, getPartController, updatePartController, deletePartController} from "../controllers/part"
import multer from "multer"
import e, { Router } from "express"
const router = Router();

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.get('/', getPartsController);
router.get('/:id', getPartController);
router.post("/",upload.single('alertImage') ,postPartController);
router.put('/:id', updatePartController);
router.delete('/:id', deletePartController);


export {router};
