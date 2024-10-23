import express from 'express';
import * as employeeControllers from '../controllers/employeeController';
const router = express.Router();

router.get('/', employeeControllers.getEmployees);
router.post('/', employeeControllers.createEmployee)

export default router;
