import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  /**
   * Proporciona un nuevo token de
   * autenticación para un usuario
   * específico.
   * @param user
   */
  //NOTA: Alternativa:
  //   createToken(user: UserEntity): string {
  //     return jwt.sign(user, 'salt');
  //   }
  createToken({ id, email }: UserEntity): string {
    return jwt.sign({ id, email }, 'salt');
  }

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
}
