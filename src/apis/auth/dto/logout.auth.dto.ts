import { ObjectType, Field, InputType } from '@nestjs/graphql';

@InputType()
export class LogoutInput {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
