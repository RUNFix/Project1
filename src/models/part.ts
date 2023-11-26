import { Schema, Types, model, Model } from 'mongoose';
import { Part } from '../interfaces/part';

const partSchema = new Schema<Part>(
  {
    name: {
      type: String,
      required: true,
      enum: [
        'Filtro de Aceite',
        'Pastillas de Freno',
        'Bujías',
        'Batería del Automóvil',
        'Neumáticos',
        'Amortiguadores',
        'Correa de Distribución',
        'Radiador',
        'Alternador',
      ],
    },
    brand: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      default: 100,
    },
    image: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const PartModel = model('Parts', partSchema);

export default PartModel;
