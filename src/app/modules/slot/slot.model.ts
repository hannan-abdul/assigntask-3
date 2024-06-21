import { Schema, model } from 'mongoose';
import { TSlot } from './slot.interface';

const slotSchema = new Schema<TSlot>(
  {
    service: { type: Schema.Types.ObjectId, ref: 'service' },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isBooked: { type: String, enum: ['available', 'booked', 'canceled'] },
  },
  {
    timestamps: true,
  },
);

export const SlotModel = model<TSlot>('slot', slotSchema);
