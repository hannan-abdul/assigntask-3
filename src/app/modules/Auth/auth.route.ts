import express from 'express';
import { AuthController } from './auth.controller';
import auth from '../../middlewares/auth';

const router = express.Router();
router.post('/auth/login', AuthController.loginUser);

export const AuthRoutes = router;
