import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

export class GqlAuthAccessGuard extends AuthGuard('access') {
  getRequest(context: ExecutionContext): Request {
    const ctx: GqlExecutionContext = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
export class GqlAuthRefreshGuard extends AuthGuard('refresh') {
  getRequest(context: ExecutionContext): Request {
    const ctx: GqlExecutionContext = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
