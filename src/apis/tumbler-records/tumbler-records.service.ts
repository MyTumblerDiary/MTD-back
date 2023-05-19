import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/users.service';
import { CreateTumblerRecordInput } from './dto/create.tumbler-record.dto';
import { TumblerRecord } from './entities/tumbler-record.entity';

@Injectable()
export class TumblerRecordsService {
  constructor(
    @InjectRepository(TumblerRecord)
    private readonly tumblerRecordsRepository: Repository<TumblerRecord>,
    private readonly userService: UserService,
  ) {}

  public async create(
    createTumblerRecordInput: CreateTumblerRecordInput,
    user: User,
  ) {
    const newTumblerRecord = this.tumblerRecordsRepository.create({
      ...createTumblerRecordInput,
      user,
    });
    const tumblerRecord = await this.tumblerRecordsRepository.save(
      newTumblerRecord,
    );
    const aasas = await this.findOne(tumblerRecord.id, ['user']);
    return aasas;
  }

  public async findAll(relations?: string[]): Promise<TumblerRecord[]> {
    return await this.tumblerRecordsRepository.find({
      relations,
    });
  }

  public async findOne(
    id: string,
    relations?: string[],
  ): Promise<TumblerRecord> {
    return await this.tumblerRecordsRepository.findOne({
      where: { id },
      relations,
    });
  }

  public async findByUserId({ id }: User): Promise<TumblerRecord[]> {
    return await this.tumblerRecordsRepository.find({
      where: {
        user: {
          id,
        },
      },
    });
  }

  public async update(
    id: string,
    updateTumblerRecordInput: CreateTumblerRecordInput,
  ): Promise<boolean> {
    const result: UpdateResult = await this.tumblerRecordsRepository.update(
      id,
      updateTumblerRecordInput,
    );
    return result.affected === 1;
  }

  public async delete(id: string): Promise<boolean> {
    const result = await this.tumblerRecordsRepository.softDelete(id);
    return result.affected === 1;
  }
}
