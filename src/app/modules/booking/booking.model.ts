import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>(
  {
    customer: { type: Schema.Types.ObjectId, ref: 'user' },
    service: { type: Schema.Types.ObjectId, ref: 'service' },
    slot: { type: Schema.Types.ObjectId, ref: 'slot' },
    vehicleType: {
      type: String,
      enum: [
        'car',
        'truck',
        'SUV',
        'van',
        'motorcycle',
        'bus',
        'electricVehicle',
        'hybridVehicle',
        'bicycle',
        'tractor',
      ],
    },
    vehicleBrand: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    manufacturingYear: { type: String, required: true },
    registrationPlate: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  },
);

export const BookingModel = model<TBooking>('booking', bookingSchema);
