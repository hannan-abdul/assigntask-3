import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { SlotServices } from './slot.service';
import httpStatus from 'http-status';

const createSlot = catchAsync(async (req: Request, res: Response) => {
  const slot = req.body;
  // const zodParseData = orderValidationSchema.parse(order);
  const result = await SlotServices.createSlotIntoDB(slot);
  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slots created successfully',
    data: result,
  });
});

const getAvailableSlot = catchAsync(async (req: Request, res: Response) => {
  const result = await SlotServices.getAvailableSlots();

  res.status(200).json({
    success: true,
    message: 'Available Slots retrieved successfully',
    date: result,
  });
});

const getAvailableSlotbyquery = catchAsync(
  async (req: Request, res: Response) => {
    const { date, serviceId } = req.query;

    const result = await SlotServices.getSlotsByDateAndService(
      date as string,
      serviceId as string,
    );

    res.status(200).json({
      success: true,
      message: 'Available slots fetched successfully',
      data: result,
    });
  },
);

export const SlotController = {
  createSlot,
  getAvailableSlotbyquery,
  getAvailableSlot,
};
