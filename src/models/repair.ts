import { Schema, Types, model, Model } from 'mongoose';

import { Repair } from '../interfaces/repair';

const ItemSchema = new Schema<Repair>(
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
    priceToPay: {
      type: Number,
      required: true,
      default: 0,
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

const repairModel = model('Repair', ItemSchema);
export default repairModel;
