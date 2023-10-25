import { Request, Response, Router } from "express";
const router = Router();
import { getVehicle } from "../controllers/vehicle";
import { logMiddleware } from "../middleware/log";

router.get("/:plate", logMiddleware, getVehicle);


export { router };
