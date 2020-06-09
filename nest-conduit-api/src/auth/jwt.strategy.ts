import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, use } from 'passport';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { ExtractJwt } from 'passport-jwt';
import { AuthPayload } from 'src/models/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'myjwt') {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Token'),
      secretOrKey: process.env.SECRET,
      //   name: 'jwte',
    });
    // use(this);
  }

  async validate(payload: AuthPayload): Promise<any> {
    const { username } = payload;
    const user = this.userRepo.findOne({ where: { username } });
    if (!user) throw new UnauthorizedException();
    else return user;
  }
}
