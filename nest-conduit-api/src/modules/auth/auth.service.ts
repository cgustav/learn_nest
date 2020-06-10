import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { RegisterDTO, LoginDTO, SearchDTO } from 'src/models/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  //   private mockUser = {
  //     email: 'test@user.cl',
  //     token: 'jwt.token.here',
  //     username: 'test',
  //     bio: 'I built the API',
  //     image: null,
  //   };
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async register(credentials: RegisterDTO): Promise<Object> {
    try {
      const user = this.userRepo.create(credentials);
      await user.save();
      return this.payloadWithJwt(user);
    } catch (error) {
      console.error(`[SignUp] Exception: ${error}`);
      throw new InternalServerErrorException();
    }
  }

  async login({ email, password }: LoginDTO) {
    try {
      // const user = await this.userRepo.findOne({ where: { email } });
      const user = await this.whoAmI({ email });
      if (!user) throw new UnauthorizedException('Invalid credentials');

      const isValid = await user.comparePassword(password);
      if (!isValid) throw new UnauthorizedException('Invalid credentials');
      else return this.payloadWithJwt(user);
    } catch (error) {
      console.error(`[LogIn] Exception: ${error}`);

      if (error.code && error.code === '23505')
        throw new ConflictException('Username has already been taken.');
      //   else throw new InternalServerErrorException();
      else throw error;
    }
  }

  async whoAmI({ email, username }: SearchDTO): Promise<UserEntity> {
    const criteria = email ? { email } : { username };
    return await this.userRepo.findOne({ where: criteria });
  }

  private payloadWithJwt(user: UserEntity) {
    const payload = { username: user.username };
    const token = this.jwtService.sign(payload);
    return {
      user: { ...user.toJSON(), token },
    };
  }
}
