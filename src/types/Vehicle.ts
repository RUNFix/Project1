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
export const initialValues: Vehicle = {
  name: '',
  cc: 0,
  model: '',
  brand: '',
  year: 0,
  color: '',
  status: '',
  priceToPay: 0,
  employee: '',
  parts: [{ name: '', description: '' }],
  date: new Date(),
  images: '',
};
