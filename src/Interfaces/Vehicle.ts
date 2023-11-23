export interface Vehicle {
  plate: string;
  model: string;
  brand: string;
  year: number;
  color: string;
  images: string[];
}

export const initialValues: Vehicle = {
  plate: '',
  model: '',
  brand: '',
  year: 0,
  color: '',
  images: [],
};
