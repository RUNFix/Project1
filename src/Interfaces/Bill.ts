export interface Bill {
  state: string;
  plate: string;
  cc: number;
  items: BillItem[];
  total: number;
  pdfLink?: string;
}

export interface BillItem {
  quantity: number;
  itemDescription: string;
  price: number;
  subtotal: number;
}