export interface Repair {
  plate: string;
  cc: number;
  reasonForService: string;
  status: number;
  employee: number;
  date: Date;
  beforeImages: string[];
  afterImages?: string[];
  beforeDescriptions?: string[];
  afterDescriptions?: string[];
}

export const initialValues: Repair = {
  plate: '',
  cc: 0,
  reasonForService: '',
  status: 1,
  employee: 0,
  date: new Date(),
  beforeImages: [],
  afterImages: [],
  beforeDescriptions: ['Trabajo realizado', 'Piezas cambiadas, etc.'],
  afterDescriptions: ['Trabajo realizado', 'Piezas cambiadas, etc.'],
};
