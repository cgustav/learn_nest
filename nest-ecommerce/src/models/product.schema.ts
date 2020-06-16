import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: String,
  description: String,
  image: String,
  price: String,
  created: {
    type: Date,
    default: Date.now,
  },
});