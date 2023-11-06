import { Schema, Types, model, Model } from 'mongoose';

import { Vehicle } from '../interfaces/vehicle';

const ItemSchema = new Schema<Vehicle>(
  {
    plate: {
      type: String,
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
    images: [String],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const vehicleModel = model('Vehicle', ItemSchema);
export default vehicleModel;
