import express from 'express';
import { ServiceController } from './service.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();
router.post(
  '/services',
  auth(USER_ROLE.admin),
  ServiceController.createService,
);
router.get('/services/:id', ServiceController.getSingleService);
router.put(
  '/services/:id',
  auth(USER_ROLE.admin),
  ServiceController.updateService,
);
router.get('/services', ServiceController.getAllServices);
router.delete(
  '/services/:id',
  auth(USER_ROLE.admin),
  ServiceController.deleteService,
);

export const ServiceRoutes = router;
