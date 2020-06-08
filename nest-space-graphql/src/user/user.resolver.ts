import {
  Resolver,
  Mutation,
  Args,
  Context,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { LaunchService } from '@/launch/launch.service';
import { UserEntity } from './user.entity';
import { UserModel } from './user.models';

@Resolver('User')
export class UserResolver {
  constructor(
    private userService: UserService,
    private launchService: LaunchService,
  ) {}

  @Query()
  @UseGuards(AuthGuard)
  me(@Context('user') user: UserModel) {
    // return user;
    return this.userService.getUserByEmail(user.email);
  }

  /**
   * Obtiene todos los viajes en los
   * cuales ha participado un usuario
   * [user] específico existente, combinando
   * desde el [LaunchService] (el cual consume
   * data la SpaceX Api V3)
   * @param user
   */
  @ResolveField()
  trips(@Parent() { trips }: UserEntity) {
    console.log('User trips: ', trips);
    return trips ? this.launchService.getLaunchByIds(trips) : [];
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

  @Mutation()
  @UseGuards(AuthGuard)
  bookTrips(
    @Args('launchIds') launchIds: string[],
    @Context('user') user: UserModel,
  ) {
    return this.userService.addTrips(
      launchIds.map(c => parseInt(c)),
      user,
    );
  }

  @Mutation()
  @UseGuards(AuthGuard)
  cancelTrip(
    @Args('launch') launchId: number,
    @Context('user') user: UserModel,
  ) {
    return this.userService.removeTrip(launchId, user);
  }
}
