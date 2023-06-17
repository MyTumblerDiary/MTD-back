import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateFranchiseInput } from './dto/create.franchise.dto';
import { SearchFranchiseInput } from './dto/search.franchise.dto';
import { UpdateFranchiseInput } from './dto/update.franchise.dto';
import { Franchise } from './entities/franchise.entity';

@Injectable()
export class FranchisesService {
  constructor(
    @InjectRepository(Franchise)
    private readonly franchisesRepository: Repository<Franchise>,
  ) {}

  async create(createFranchiseInput: CreateFranchiseInput): Promise<Franchise> {
    return this.franchisesRepository.save(
      this.franchisesRepository.create(createFranchiseInput),
    );
  }

  async createBulk(
    createFranchiseInputs: CreateFranchiseInput[],
  ): Promise<Franchise[]> {
    return this.franchisesRepository.save(
      this.franchisesRepository.create(createFranchiseInputs),
    );
  }

  async findAll(): Promise<Franchise[]> {
    return this.franchisesRepository.find();
  }

  async search(searchInput: SearchFranchiseInput): Promise<Franchise[]> {
    return this.franchisesRepository.find({
      where: {
        [searchInput.searchBy]: Like(`%${searchInput.value}%`),
      },
    });
  }

  async findOne(id: string): Promise<Franchise> {
    return this.franchisesRepository.findOneOrFail({
      where: { id },
    });
  }

  async update(
    id: string,
    updateFranchiseInput: UpdateFranchiseInput,
  ): Promise<Franchise> {
    await this.franchisesRepository.update(id, updateFranchiseInput);
    return this.findOne(id);
  }

  async delete(id: string): Promise<boolean> {
    await this.franchisesRepository.delete(id);
    return true;
  }
}
