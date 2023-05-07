import { Injectable } from '@nestjs/common';
import { CreatePrivateSpaceInput } from './dto/create-private-space.input';
import { UpdatePrivateSpaceInput } from './dto/update-private-space.input';

@Injectable()
export class PrivateSpacesService {
  create(createPrivateSpaceInput: CreatePrivateSpaceInput) {
    return 'This action adds a new privateSpace';
  }

  findAll() {
    return `This action returns all privateSpaces`;
  }

  findOne(id: number) {
    return `This action returns a #${id} privateSpace`;
  }

  update(id: number, updatePrivateSpaceInput: UpdatePrivateSpaceInput) {
    return `This action updates a #${id} privateSpace`;
  }

  remove(id: number) {
    return `This action removes a #${id} privateSpace`;
  }
}
