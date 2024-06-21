import { TSlot } from './slot.interface';
import { SlotModel } from './slot.model';

const createSlotIntoDB = async (payload: TSlot) => {
  const { service, date, startTime, endTime } = payload;

  const start = parseTime(startTime);
  const end = parseTime(endTime);
  const serviceDuration = 60; // Duration in minutes

  const slots: TSlot[] = [];
  for (
    let currentTime = start;
    currentTime + serviceDuration <= end;
    currentTime += serviceDuration
  ) {
    const slot: TSlot = {
      service,
      date,
      startTime: formatTime(currentTime),
      endTime: formatTime(currentTime + serviceDuration),
      isBooked: 'available',
    };
    slots.push(slot);
  }

  const result = await SlotModel.insertMany(slots);
  return result;
};

// const getAvailableSlots = async () => {
//   const result = await SlotModel.find().populate('service');
//   return result;
// };

const getSlotsByDateAndService = async (date?: string, service?: string) => {
  const filter: any = { isBooked: 'available' };
  if (date) filter.date = date;
  if (service) filter.service = service;

  const result = await SlotModel.find(filter).populate('service');

  return result;
};

export const SlotServices = {
  createSlotIntoDB,
  // getAvailableSlots,
  getSlotsByDateAndService,
};

const parseTime = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const formatTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
};
