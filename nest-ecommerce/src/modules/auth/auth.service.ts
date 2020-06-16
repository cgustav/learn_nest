import { Injectable } from '@nestjs/common';
import { UserService } from '../shared/user.service';
import { sign } from 'jsonwebtoken';
import { User } from '../../types/user';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  signPayload(payload: any): string {
    return sign(payload, process.env.SECRET, { expiresIn: '12h' });
  }

  async validateUser(payload: any): Promise<User> {
    return await this.userService.findByPayload(payload);
  }
}
