// routes/loginRoutes.ts
import express from 'express';
import * as loginController from '../controllers/authController';

const router = express.Router();

router.post('/login', loginController.login);

export default router;