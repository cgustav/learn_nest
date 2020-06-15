import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/types/user';
import { LoginDTO, RegisterDTO } from 'src/models/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async findByLogin(data: LoginDTO): Promise<Object> {
    const { username, password } = data;
    const document = await this.userModel.findOne({ username });
    if (!document || !(await bcrypt.compare(password, document.password)))
      throw new UnauthorizedException('Invalid credentials');
    else return this.sanitizedUser(document);
  }

  async create(data: RegisterDTO): Promise<Object> {
    const { username } = data;
    const coincidence = await this.userModel.findOne({ username });
    if (coincidence) throw new BadRequestException('User already exists');

    console.log('DOCUMENTX: ', data);

    const createdUser = new this.userModel(data);
    await createdUser.save();
    return this.sanitizedUser(createdUser);
  }

  private sanitizedUser(user: User) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }
}
