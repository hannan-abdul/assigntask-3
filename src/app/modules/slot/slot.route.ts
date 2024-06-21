import express from 'express';
import { SlotController } from './slot.controller';

const router = express.Router();
router.post('/services/slots', SlotController.createSlot);
// router.get('/services/:id', ServiceController.getSingleService);
// router.put(
//   '/services/:id',
//   auth(USER_ROLE.admin),
//   ServiceController.updateService,
// );
router.get('/slots/availability', SlotController.getAvailableSlot);
router.get('/slots/availabilityquery', SlotController.getAvailableSlotbyquery);
// router.delete(
//   '/services/:id',
//   auth(USER_ROLE.admin),
//   ServiceController.deleteService,
// );

export const SlotRoutes = router;
