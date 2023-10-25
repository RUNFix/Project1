import { Schema, Types, model, Model } from 'mongoose';

import { Vehicle } from '../interfaces/vehicle';

const ItemSchema = new Schema<Vehicle>(
  {
    name: {
      type: String,
      required: true,
    },
    plate: {
      type: String,
      required: true,
    },
    cc: {
      type: Number,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    color: {
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
    images: [String],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const vehicleModel = model('Vehicle', ItemSchema);
export default vehicleModel;
