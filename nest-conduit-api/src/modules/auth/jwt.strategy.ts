import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
// import { Strategy } from 'passport-local';
import { InjectRepository } from '@nestjs/typeorm';
// import { UserEntity } from 'src/entities/user.entity';
// import { Repository } from 'typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
// import { AuthPayload } from 'src/models/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'myjwt') {
  constructor(
    private authService: AuthService /*@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,*/,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Token'),
      ignoreExpiration: true,
      secretOrKey: process.env.SECRET,
    });
    // use(this);
  }

  async validate(payload: any) /*: Promise<UserEntity>*/ {
    console.log('validate');
    console.log('JWT PAYLOAD: ', payload);

    // const { username } = payload;
    // const user = this.userRepo.findOne({ where: { username } });
    // if (!user) throw new UnauthorizedException();
    // else return user;

    const { username } = payload;
    const user = this.authService.findCurrentUser(username);
    if (!user) throw new UnauthorizedException();
    else return user;

    // return { userId: payload.sub, username: payload.username };
  }
}
