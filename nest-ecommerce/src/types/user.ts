import { Document } from 'mongoose';
import { Address } from './address';

export interface User extends Document {
  username: string;
  readonly password: string;
  seller: boolean;
  address: Address;
  created: Date;
}
