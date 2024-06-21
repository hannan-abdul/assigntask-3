import { Request, Response } from 'express';
import { ServiceServices } from './service.service';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

const createService = catchAsync(async (req: Request, res: Response) => {
  const service = req.body;
  // const zodParseData = orderValidationSchema.parse(order);
  const result = await ServiceServices.createServiceIntoDB(service);
  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service created successfully',
    data: result,
  });
});

const getSingleService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServiceServices.getSingleServiceFromDB(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'This User is not found');
  }

  res.status(200).json({
    success: true,
    message: 'single service retrieved successfully',
    data: result,
  });
});

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceServices.getAllServicesFromDB();
  res.status(200).json({
    success: true,
    message: 'Service fetched successfully',
    date: result,
  });
});

const updateService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const service = req.body;

    //   const zodParseData =
    //     productValidation.updateProductValidationSchema.parse(product);
    if (!service) {
      return res.status(400).json({
        success: false,
        message: 'service data is required',
      });
    }
    const result = await ServiceServices.updateServiceFromDB(id, service);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'service not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'service updated successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const deleteService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await ServiceServices.deleteServiceFromDB(id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'service not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'service deleted successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

export const ServiceController = {
  createService,
  getSingleService,
  getAllServices,
  updateService,
  deleteService,
};
