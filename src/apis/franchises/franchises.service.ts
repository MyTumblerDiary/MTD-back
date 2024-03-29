import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFranchiseInput } from './dto/create.franchise.dto';
import { UpdateFranchiseInput } from './dto/update.franchise.dto';
import { Franchise } from './entities/franchise.entity';

@Injectable()
export class FranchisesService {
  constructor(
    @InjectRepository(Franchise)
    private readonly franchisesRepository: Repository<Franchise>,
  ) {}

  async create(createFranchiseInput: CreateFranchiseInput) {
    return this.franchisesRepository.save(
      this.franchisesRepository.create(createFranchiseInput),
    );
  }

  async createBulk(createFranchiseInputs: CreateFranchiseInput[]) {
    return this.franchisesRepository.save(
      this.franchisesRepository.create(createFranchiseInputs),
    );
  }

  async findAll() {
    return this.franchisesRepository.find();
  }

  async findOne(id: string) {
    return this.franchisesRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, updateFranchiseInput: UpdateFranchiseInput) {
    await this.franchisesRepository.update(id, updateFranchiseInput);
    return this.findOne(id);
  }

  async delete(id: string) {
    await this.franchisesRepository.delete(id);
    return this.findOne(id);
  }
}
