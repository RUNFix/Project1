export interface Client {
  name: string;
  lastname: string;
  cc: number;
  email: string;
  phoneNumber: number;
  chatId: string;
  ccExpirationDate: string;
}

export const initialValuesClient:  Client= {
  name: '',
  lastname:  '',
  cc:  0,
  email:  '',
  phoneNumber:  0,
  ccExpirationDate:  '',
  chatId: '',
};