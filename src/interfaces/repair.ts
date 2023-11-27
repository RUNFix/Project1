import { Date } from 'mongoose';

export interface Repair {
  plate: string;
  cc: number;
  reasonForService: string;
  status: number;
  employee: number;
  date: Date;
  beforeImages: string[];
  afterImages: string[];
  beforeDescriptions: string[];
  afterDescriptions: string[];
}
