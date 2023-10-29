import { Date } from 'mongoose';

interface Part {
  name: string;
  description: string;
}

export interface Vehicle {
  id: Number;
  plate: string;
  name: string;
  cc: number;
  model: string;
  brand: string;
  year: number;
  color: string;
  status: number;
  priceToPay: number;
  employee: number;
  date: Date;
  images: string[];
  imagesFixed: string[];
}
