export interface Vehicle {
  id: number;
  plate: string;
  name: string;
  cc: number;
  model: string;
  brand: string;
  year: number;
  color: string;
  status: string;
  priceToPay: number;
  employee: string;
  date: Date;
  images: string[];
}

export const initialValues: Vehicle = {
  id: 0,
  name: '',
  plate: '',
  cc: 0,
  model: '',
  brand: '',
  year: 0,
  color: '',
  status: '',
  priceToPay: 0,
  employee: '',
  date: new Date(),
  images: [],
};
