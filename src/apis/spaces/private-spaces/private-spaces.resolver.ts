import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { User } from '../../users/entities/user.entity';
import { CreatePrivateSpaceInput } from './dto/create-private-space.input';
import { UpdatePrivateSpaceInput } from './dto/update-private-space.input';
import { PrivateSpace } from './entities/private-space.entity';
import { PrivateSpacesService } from './private-spaces.service';

@Resolver(() => PrivateSpace)
export class PrivateSpacesResolver {
  constructor(private readonly privateSpacesService: PrivateSpacesService) {}

  @Mutation(() => PrivateSpace)
  createPrivateSpace(
    @Args('createPrivateSpaceInput')
    createPrivateSpaceInput: CreatePrivateSpaceInput,
  ): Promise<PrivateSpace> {
    return this.privateSpacesService.create(createPrivateSpaceInput);
  }

  @Query(() => [PrivateSpace], { name: 'privateSpaces' })
  findAll(): Promise<PrivateSpace[]> {
    return this.privateSpacesService.findAll();
  }

  @Query(() => PrivateSpace, { name: 'privateSpace' })
  findOne(@Args('id') id: string): Promise<PrivateSpace> {
    return this.privateSpacesService.findOne(id);
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PrivateSpace)
  updatePrivateSpace(
    @CurrentUser('user') user: User,
    @Args('updatePrivateSpaceInput')
    updatePrivateSpaceInput: UpdatePrivateSpaceInput,
  ): Promise<PrivateSpace> {
    return this.privateSpacesService.update(user.id, updatePrivateSpaceInput);
  }

  @Mutation(() => PrivateSpace)
  removePrivateSpace(@Args('id') id: string): Promise<PrivateSpace> {
    return this.privateSpacesService.remove(id);
  }
}
