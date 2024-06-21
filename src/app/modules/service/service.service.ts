import { TService } from './service.interface';
import { ServiceModel } from './service.model';

const createServiceIntoDB = async (payload: TService) => {
  const result = await ServiceModel.create(payload);
  return result;
};

const getSingleServiceFromDB = async (_id: string) => {
  const result = await ServiceModel.findById(_id);
  return result;
};
const getAllServicesFromDB = async () => {
  const result = await ServiceModel.find();
  return result;
};

const updateServiceFromDB = async (id: string, payload: Partial<TService>) => {
  const result = await ServiceModel.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteServiceFromDB = async (_id: string) => {
  const result = await ServiceModel.findByIdAndUpdate(
    { _id },
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const ServiceServices = {
  createServiceIntoDB,
  getSingleServiceFromDB,
  getAllServicesFromDB,
  updateServiceFromDB,
  deleteServiceFromDB,
};
