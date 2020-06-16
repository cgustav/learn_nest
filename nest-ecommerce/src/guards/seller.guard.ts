import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class SellerGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('SELLER GUARD USER: ', user);
    if (user.seller) return true;

    throw new UnauthorizedException('Unauthorized access');
  }
}
