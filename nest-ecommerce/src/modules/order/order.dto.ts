import { Document } from 'mongoose';

export interface CreateOrderDTO {
  products: [
    {
      product: string;
      quantity: number;
    },
  ];
}
