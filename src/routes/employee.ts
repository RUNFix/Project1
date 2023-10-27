import { Request, Response, Router, RequestHandler } from 'express';
import {
  getEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} from '../controllers/employee';
import { logMiddleware } from '../middleware/log';
import {
  adminAuthorize,
  authMiddleware,
  refreshAuthMiddleware,
} from '../middleware/auth';

const router = Router();

/* Se esta llamando empleados en vehciulos fromulario, no podria autenticar
como admin por que la usa employee al logearse */

router.get('/', authMiddleware, adminAuthorize, getEmployees);
//router.get('/', getEmployees);

// router.get('/refresh-token', refreshAuthMiddleware, getEmployees);

router.get('/:id', authMiddleware, getEmployee);
//router.get('/:id', getEmployee);

//router.post('/', authMiddleware,postEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

export { router };
