export interface Vehicle {
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
}

export const initialValues: Vehicle = {
  name: '',
  plate: '',
  cc: 0,
  model: '',
  brand: '',
  year: 0,
  color: '',
  status: 1,
  priceToPay: 0,
  employee: 0,
  date: new Date(),
  images: [],
};
