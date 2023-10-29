import { Request, Response, Router } from "express";
import { getClientController, getClientsController,  postClientController, updateClientController, deleteClientController} from "../controllers/client";
const router = Router();

router.get('/:cc', getClientController);
router.get('/', getClientsController);
router.post("/", postClientController);
router.put('/:cc', updateClientController);
router.delete('/:cc', deleteClientController);

export {router};