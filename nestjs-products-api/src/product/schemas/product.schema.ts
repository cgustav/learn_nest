import {Schema  } from "mongoose";

export const ProductSchema = new Schema({
    name: String, 
    description:String,
    imageUrl: String,
    price: Number,
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

