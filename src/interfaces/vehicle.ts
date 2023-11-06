import { Date } from 'mongoose';

interface Part {
  name: string;
  description: string;
}

export interface Vehicle {
  id: Number;
  plate: string;
  model: string;
  brand: string;
  year: number;
  color: string;
  images: string[];
}
