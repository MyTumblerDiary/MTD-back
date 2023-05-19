import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePrivateSpaceInput } from './dto/create-private-space.input';
import { UpdatePrivateSpaceInput } from './dto/update-private-space.input';
import { PrivateSpace } from './entities/private-space.entity';

@Injectable()
export class PrivateSpacesService {
  constructor(
    @InjectRepository(PrivateSpace)
    private privateSpaceRepository: Repository<PrivateSpace>,
  ) {}

  async create(
    createPrivateSpaceInput: CreatePrivateSpaceInput,
  ): Promise<PrivateSpace> {
    return this.privateSpaceRepository.save(
      this.privateSpaceRepository.create(createPrivateSpaceInput),
    );
  }

  async findAll(): Promise<PrivateSpace[]> {
    return this.privateSpaceRepository.find();
  }

  async findOne(id: string): Promise<PrivateSpace> {
    return this.privateSpaceRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: string,
    updatePrivateSpaceInput: UpdatePrivateSpaceInput,
  ): Promise<PrivateSpace> {
    await this.privateSpaceRepository.update({ id }, updatePrivateSpaceInput);
    return this.findOne(id);
  }

  async delete(id: string): Promise<PrivateSpace> {
    await this.privateSpaceRepository.delete({ id });
    return this.findOne(id);
  }
}
