/**
 * Clase que define los atributos
 * de la representación del objeto 
 * "final" a ser guardado en la
 * base de datos.
 * También conocido como (DTO, o 
 * Data Transfer Object)
 */
export class CreateProductDTO{
    readonly name: string;
    readonly description: string;
    readonly imageURL: string;
    readonly price: number;
    readonly createdAt: Date;
}