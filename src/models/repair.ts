import { Schema, Types, model, Model } from 'mongoose';

import { Repair } from '../interfaces/repair';

const RepairSchema = new Schema<Repair>(
  {
    plate: {
      type: String,
      required: true,
    },
    cc: {
      type: Number,
      required: true,
    },
    reasonForService: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
      enum: [1, 2, 3],
    },
    employee: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    beforeImages: [String],
    afterImages: [String],
    beforeDescriptions: [String],
    afterDescriptions: [String],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const repairModel = model('Repair', RepairSchema);
export default repairModel;
