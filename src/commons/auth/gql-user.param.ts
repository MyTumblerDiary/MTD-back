import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserAuth } from 'src/domains/auth/interfaces/user-auth';

export const CurrentUser = createParamDecorator(
  (data, context: ExecutionContext): UserAuth => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);

export const CurrentToken = createParamDecorator(
  (data, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  },
);
