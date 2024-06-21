import express from 'express';
import { SlotController } from './slot.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();
router.post(
  '/services/slots',
  auth(USER_ROLE.admin),
  SlotController.createSlot,
);
// router.get('/slots/availability', SlotController.getAvailableSlot);
router.get('/slots/availability', SlotController.getAvailableSlotbyquery);

export const SlotRoutes = router;
