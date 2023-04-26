import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateTumblerRecordInput } from './dto/create.tumbler-record.dto';
import { TumblerRecord } from './entities/tumbler-record.entity';

@Injectable()
export class TumblerRecordsService {
  constructor(
    @InjectRepository(TumblerRecord)
    private readonly tumblerRecordsRepository: Repository<TumblerRecord>,
  ) {}

  public async create(createTumblerRecordInput: CreateTumblerRecordInput) {
    const newTumblerRecord = this.tumblerRecordsRepository.create(
      createTumblerRecordInput,
    );
    return await this.tumblerRecordsRepository.save(newTumblerRecord);
  }

  public async findAll(): Promise<TumblerRecord[]> {
    return await this.tumblerRecordsRepository.find();
  }

  public async findOne(id: string): Promise<TumblerRecord> {
    return await this.tumblerRecordsRepository.findOne({
      where: { id },
    });
  }

  public async findByUserId(userId: string): Promise<TumblerRecord[]> {
    return await this.tumblerRecordsRepository.find({
      where: {
        user: {
          id: userId,
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
