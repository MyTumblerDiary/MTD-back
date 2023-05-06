import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ImageType } from 'src/commons/images/enum/image-type.enum';

@ObjectType()
export class S3PresignedUrlOutput {
  @Field(() => String, { nullable: false })
  presignedUrl!: string;

  @Field(() => String, { nullable: false })
  fileKey!: string;
}

@InputType()
export class S3PresignedUrlInput {
  @Field(() => String, { nullable: false })
  fileName!: string;

  @Field(() => ImageType, { nullable: false })
  type!: ImageType;
}
