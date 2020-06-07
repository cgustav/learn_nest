import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from '../graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query()
  @UseGuards(new AuthGuard())
  me(@Context('user') user: User) {
    return user;
  }

  /**
   * Mutación que cumple la función de
   * findOneOrCreate para entidad [user]
   * (usuario) para resolver GraphQL
   * @param email
   */
  @Mutation()
  async login(@Args('email') email: string): Promise<string> {
    let user = await this.userService.getUserByEmail(email);
    if (!user) user = await this.userService.createUser(email);
    return this.userService.createToken(user);
  }
}
