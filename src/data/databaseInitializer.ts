import PartModel from "../models/part";
import { initialPartsData } from '../data/initialPartsData';


export const initializeDatabase = async () => {
    
  const count = await PartModel.countDocuments();
  if (count === 0) {
    for (const partData of initialPartsData) {
      const part = new PartModel(partData);
      await part.save();
    }
    console.log('Base de datos inicializada.');
  } else {
    console.log('La base de datos ya está inicializada.');
  }
};
