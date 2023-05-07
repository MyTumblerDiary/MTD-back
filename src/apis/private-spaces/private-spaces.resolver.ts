import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
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
  ) {
    return this.privateSpacesService.create(createPrivateSpaceInput);
  }

  @Query(() => [PrivateSpace], { name: 'privateSpaces' })
  findAll() {
    return this.privateSpacesService.findAll();
  }

  @Query(() => PrivateSpace, { name: 'privateSpace' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.privateSpacesService.findOne(id);
  }

  @Mutation(() => PrivateSpace)
  updatePrivateSpace(
    @Args('updatePrivateSpaceInput')
    updatePrivateSpaceInput: UpdatePrivateSpaceInput,
  ) {
    return this.privateSpacesService.update(
      updatePrivateSpaceInput.id,
      updatePrivateSpaceInput,
    );
  }

  @Mutation(() => PrivateSpace)
  removePrivateSpace(@Args('id', { type: () => Int }) id: number) {
    return this.privateSpacesService.remove(id);
  }
}
