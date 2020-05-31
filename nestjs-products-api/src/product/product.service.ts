import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { Product  } from "./interfaces/product.interface";
import { CreateProductDTO } from "./dto/product.dto";

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>){}

    /**
     * Retorna una lista con todos los productos
     * disponibles en la base de datos.
     */
    async getProducts(): Promise<Product[]>{
        return await this.productModel.find();
    }

    /**
     * Retorna un producto en base a una id.
     * 
     * @param productID 
     */
    async getProduct(productID: string): Promise<Product>{
        return await this.productModel.findById(productID);
    }

    /**
     * Crea un producto en base a un objeto DTO 
     * de producto: [CreateProductDTO].
     * 
     * @param createProductDTO 
     */
    async createProduct(createProductDTO: CreateProductDTO): Promise<Product>{
        const product = await new this.productModel(createProductDTO);
        return await product.save();
    }


    /**
     * Actualiza un producto en Base de Datos
     * según un ID (hash) y los parámetros a 
     * actualizar.
     * 
     * @param productID 
     * @param createProductDTO 
     */
    async updateProduct(productID:string, createProductDTO: CreateProductDTO): Promise<Product>{
        return await this.productModel.findByIdAndUpdate(productID, createProductDTO, {new: true});
    }

    /**
     * Elimina un producto en Base de Datos
     * según un ID (hash).
     * 
     * @param productID 
     */
    async deleteProduct(productID: string): Promise<Product>{
        return await this.productModel.findByIdAndDelete(productID);
    }
}
