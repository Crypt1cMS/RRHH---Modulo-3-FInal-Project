import express from 'express';
import * as employeeControllers from '../controllers/employeeController';
import tokenAuthentication from '../middleware/jwtauth'
const router = express.Router();

router.get('/', employeeControllers.getEmployees);
router.post('/', employeeControllers.createEmployee);
router.get('/:id', employeeControllers.getEmployeeById);
router.put('/:id', employeeControllers.updateEmployee);
router.delete('/:id', employeeControllers.deleteEmployee);
router.put('/:id/reactivate', employeeControllers.reactivateEmployee);

export default router;