import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LoginResponseDto {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
