import { Document } from 'mongoose';
import { User } from './user';
import { Product } from './product';

// export interface User extends Document {
//   name: string;
//   readonly password: string;
//   seller: boolean;
//   address: Address;
//   created: Date;
// }

interface ProductOrder {
  product: Product;
  quantity: number;
}

export interface Order extends Document {
  owner: User;
  totalPrice: number;
  products: ProductOrder[];
  created: Date;
}
