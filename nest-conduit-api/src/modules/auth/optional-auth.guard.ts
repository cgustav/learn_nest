import { AuthGuard } from '@nestjs/passport';

export class OptionalAuthGuard extends AuthGuard('myjwt') {
  handleRequest(err, user, info, context) {
    return user;
  }
}
