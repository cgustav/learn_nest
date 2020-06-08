import { Injectable } from '@nestjs/common';
// import {  } from "@nestjs/config";
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { TripUpdateResponseModel, UserModel } from './user.models';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>, // private configService: ConfigService
  ) {}

  /**
   * Proporciona un nuevo token de
   * autenticación para un usuario
   * específico.
   * @param user
   */
  createToken({ id, email }: UserEntity): string {
    return jwt.sign({ id, email }, 'salt');
  }
  //NOTA: Alternativa:
  //   createToken(user: UserEntity): string {
  //     return jwt.sign(user, 'salt');
  //   }
  //----------------------------------------------

  /**
   * Crea una nueva entidad usuario en
   * la base de datos.
   * @param email
   */
  createUser(email: string): Promise<UserEntity> {
    return this.userRepo.create({ email }).save();
  }

  /**
   * Obtiene un usuario específico
   * según su email.
   * @param email
   */
  getUserByEmail(email: string): Promise<UserEntity> {
    return this.userRepo.findOne({ email });
  }

  /**
   * Añade una colección (Array) de lanzamientos
   * a un usuario específico (según su email)
   * @param ids number[]
   * @param email string
   */
  async addTrips(
    ids: number[],
    { email }: UserModel,
  ): Promise<TripUpdateResponseModel> {
    try {
      const user = await this.getUserByEmail(email);
      user.trips = user.trips
        ? Array.from(new Set(user.trips.concat(ids)))
        : ids;
      await user.save();
      return {
        success: true,
        message: `Successfully added trips with ids: ${ids.join(', ')}`,
        launches: [90, 80, 10],
      };
    } catch (error) {
      console.error(error);
      return this.createTripUpdateError(`Error: ${error}`, ids);
    }
  }

  /**
   * Elimina un lanzamiento (desde array) asociado
   * a un usuario especifico (según su email)
   * @param id number
   * @param email string
   */
  async removeTrip(
    id: number,
    { email }: UserModel,
  ): Promise<TripUpdateResponseModel> {
    try {
      const user = await this.getUserByEmail(email);
      user.trips = user.trips.filter(t => t !== id);
      await user.save();
      return {
        success: true,
        message: `Successfully added trips with id: ${id}`,
        launches: [id],
      };
    } catch (error) {
      return this.createTripUpdateError(`Error: ${error}`, [id]);
    }
  }

  private createTripUpdateError(
    message: string,
    launches: number[],
  ): TripUpdateResponseModel {
    return {
      success: false,
      message,
      launches,
    };
  }
}
