import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateFranchiseInput } from './dto/create.franchise.dto';
import { UpdateFranchiseInput } from './dto/update.franchise.dto';
import { Franchise } from './entities/franchise.entity';
import { FranchisesService } from './franchises.service';

@Resolver('Franchise')
export class FranchisesResolver {
  constructor(private readonly franchisesService: FranchisesService) {}

  @Query(() => [Franchise], {
    name: 'franchises',
    description: '모든 프렌차이즈를 조회합니다. ',
  })
  public async franchises(): Promise<Franchise[]> {
    return await this.franchisesService.findAll();
  }

  @Query(() => Franchise, {
    name: 'franchise',
    description: 'id로 하나의 프렌차이즈를 조회합니다. ',
  })
  public async franchise(@Args('id') id: string): Promise<Franchise> {
    return await this.franchisesService.findOne(id);
  }

  @Mutation(() => Franchise, {
    name: 'createFranchise',
    description: '프렌차이즈를 생성합니다. ',
  })
  public async createFranchise(
    @Args('createFranhiseInput') createFranchiseInput: CreateFranchiseInput,
  ): Promise<Franchise> {
    return await this.franchisesService.create(createFranchiseInput);
  }

  @Mutation(() => Franchise, {
    name: 'updateFranchise',
    description: '프렌차이즈를 수정합니다. ',
  })
  public async updateFranchise(
    @Args('id') id: string,
    @Args('updateFranchiseInput') updateFranchiseInput: UpdateFranchiseInput,
  ): Promise<Franchise> {
    return await this.franchisesService.update(id, updateFranchiseInput);
  }

  @Mutation(() => Franchise, {
    name: 'deleteFranchise',
    description: '프렌차이즈를 삭제합니다. ',
  })
  public async deleteFranchise(@Args('id') id: string): Promise<Franchise> {
    return await this.franchisesService.delete(id);
  }
}
