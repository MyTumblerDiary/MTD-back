import { Field, InputType } from '@nestjs/graphql';
import { CommonEntity } from 'src/infrastructures/database/entities/common.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@InputType('refreshTokenInputType', { isAbstract: true })
@Entity({ name: 'refreshTokens' })
export class RefreshToken extends CommonEntity {
  @Column({ unique: true, nullable: false })
  @Field(() => String, {
    description: 'refreshToken',
    nullable: false,
  })
  refreshToken: string;

  @ManyToOne(() => User, (user) => user.refreshTokens)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
