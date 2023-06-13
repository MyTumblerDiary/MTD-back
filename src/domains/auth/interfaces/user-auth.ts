import { User } from 'src/domains/users/entities/user.entity';

export interface UserAuth extends Partial<User> {
  id: string;
  email: string;
}
