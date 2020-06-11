import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import {
  RegisterDTO,
  LoginDTO,
  SearchDTO,
  UpdateDTO,
} from 'src/models/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  /*
   Payload Example
   {
      email: 'test@user.cl',
      username: 'test',
      bio: 'I built the API',
      image: null,
      token: 'jwt.token.here',
    };
  */

  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async register(credentials: RegisterDTO): Promise<UserEntity> {
    try {
      const user = this.userRepo.create(credentials);
      await user.save();
      return user;
    } catch (error) {
      console.error(`[SignUp] Exception: ${error}`);
      throw new InternalServerErrorException();
    }
  }

  async login({ email, password }: LoginDTO): Promise<UserEntity> {
    try {
      const user = await this.findUserBy({ email });
      if (!user) throw new UnauthorizedException('Invalid credentials');

      const isValid = await user.comparePassword(password);
      if (!isValid) throw new UnauthorizedException('Invalid credentials');
      return user;
    } catch (error) {
      console.error(`[LogIn] Exception: ${error}`);

      if (error.code && error.code === '23505')
        throw new ConflictException('Username has already been taken.');
      else throw error;
    }
  }

  async updateUser(username: string, data: UpdateDTO): Promise<UserEntity> {
    await this.userRepo.update({ username }, data);
    return await this.findUserBy({ username });
  }

  async findCurrentUser(username: string): Promise<UserEntity> {
    return await this.findUserBy({ username });
  }

  /* Utils */

  private async findUserBy({
    email,
    username,
  }: SearchDTO): Promise<UserEntity> {
    const criteria = email ? { email } : { username };
    return await this.userRepo.findOne({ where: criteria });
  }

  /**
   * Retorna un objeto [UserEntity] que incluye
   * el campo [token] con la firma JWT correspondiente
   * a sus propiedades.
   * @param user
   */
  signUserWithJWT(user: UserEntity): Object {
    const payload = { username: user.username };
    const token = this.jwtService.sign(payload);
    return {
      user: { ...user.toJSON(), token },
    };
  }
}
