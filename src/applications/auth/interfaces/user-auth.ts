import { User } from 'src/applications/users/entities/user.entity';

export interface UserAuth extends Partial<User> {
  id: string;
  email: string;
}
