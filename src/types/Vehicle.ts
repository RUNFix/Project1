import { Part } from '@/types/Part';

export interface Vehicle {
  name: string;
  cc: number;
  model: string;
  brand: string;
  year: number;
  color: string;
  status: string;
  priceToPay: number;
  employee: string;
  parts: Part[];
  date: Date;
  images: string;
}
