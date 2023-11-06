import { Request, Response, Router } from "express";

import {getAlertsController, postAlertController, deleteAlertController} from "../controllers/alert";
const router = Router();

router.get('/', getAlertsController);
router.post("/", postAlertController);
router.delete('/:id', deleteAlertController);

export {router};