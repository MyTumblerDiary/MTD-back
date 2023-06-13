import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateFranchiseInput } from 'src/applications/franchises/dto/create.franchise.dto';
import { UpdateFranchiseInput } from 'src/applications/franchises/dto/update.franchise.dto';
import { Franchise } from 'src/applications/franchises/entities/franchise.entity';
import { FranchisesService } from 'src/applications/franchises/franchises.service';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { SearchInput } from 'src/infrastructures/database/search/dto/search.dto';

@Resolver('Franchise')
export class FranchisesResolver {
  constructor(private readonly franchisesService: FranchisesService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [Franchise], {
    name: 'franchises',
    description: '모든 프렌차이즈를 조회합니다. ',
  })
  public async franchises(): Promise<Franchise[]> {
    return await this.franchisesService.findAll();
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => Franchise, {
    name: 'franchise',
    description: 'id로 하나의 프렌차이즈를 조회합니다. ',
  })
  public async franchise(@Args('id') id: string): Promise<Franchise> {
    return await this.franchisesService.findOne(id);
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [Franchise], {
    name: 'franchisesBySearch',
    description: '검색 조건에 맞는 프렌차이즈를 조회합니다. ',
  })
  public async franchisesBySearch(
    @Args('searchInput') searchInput: SearchInput,
  ): Promise<Franchise[]> {
    return await this.franchisesService.search(searchInput);
  }

  @UseGuards(GqlAuthAccessGuard)
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

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean, {
    name: 'deleteFranchise',
    description: '프렌차이즈를 삭제합니다. ',
  })
  public async deleteFranchise(@Args('id') id: string): Promise<boolean> {
    return await this.franchisesService.delete(id);
  }
}
