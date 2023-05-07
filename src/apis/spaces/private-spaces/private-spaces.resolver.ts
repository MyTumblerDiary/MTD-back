import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { User } from '../../users/entities/user.entity';
import { CreatePrivateSpaceInput } from './dto/create-private-space.input';
import { UpdatePrivateSpaceInput } from './dto/update-private-space.input';
import { PrivateSpace } from './entities/private-space.entity';
import { PrivateSpacesService } from './private-spaces.service';

@Resolver('PrivateSpace')
export class PrivateSpacesResolver {
  constructor(private readonly privateSpacesService: PrivateSpacesService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PrivateSpace, {
    description: '개인 공간을 생성합니다.',
  })
  createPrivateSpace(
    @Args('createPrivateSpaceInput')
    createPrivateSpaceInput: CreatePrivateSpaceInput,
  ): Promise<PrivateSpace> {
    return this.privateSpacesService.create(createPrivateSpaceInput);
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [PrivateSpace], {
    name: 'privateSpaces',
    description: '개인 공간을 모두 가져옵니다.',
  })
  privateSpaces(): Promise<PrivateSpace[]> {
    return this.privateSpacesService.findAll();
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => PrivateSpace, {
    name: 'privateSpace',
    description: '개인 공간을 하나 가져옵니다.',
  })
  privateSpace(@Args('id') id: string): Promise<PrivateSpace> {
    return this.privateSpacesService.findOne(id);
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PrivateSpace, {
    name: 'updatePrivateSpace',
    description: '개인 공간을 수정합니다.',
  })
  updatePrivateSpace(
    @CurrentUser('user') user: User,
    @Args('updatePrivateSpaceInput')
    updatePrivateSpaceInput: UpdatePrivateSpaceInput,
  ): Promise<PrivateSpace> {
    return this.privateSpacesService.update(user.id, updatePrivateSpaceInput);
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PrivateSpace, {
    name: 'deletePrivateSpace',
    description: '개인 공간을 삭제합니다.',
  })
  deletePrivateSpace(@Args('id') id: string): Promise<PrivateSpace> {
    return this.privateSpacesService.delete(id);
  }
}
