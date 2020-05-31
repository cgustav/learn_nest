import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from "./schemas/product.schema";

//?Nota1: Mongoose Module de la biblioteca 
//@nestJS/mongoose permite "registrar" nuestros 
//esquemas personalizados en la conexión a la 
//base de datos de mongoose.
//
//?Nota2: MoongoseModule posee el método estático
//[forFeature] que permite registrar múltiples
//esquemas desde cualquiera los modulos ts que 
//hayamos creado.
//Según su documentación consta de:
//
//```typescript
// static forFeature(models?: ModelDefinition[], connectionName?: string): DynamicModule;
//```
@Module({
  imports:[MongooseModule.forFeature([
    {
    name: 'Product', 
    schema: ProductSchema,
    },

])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
