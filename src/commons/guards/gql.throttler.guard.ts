import { Injectable, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { ThrottlerGuard } from "@nestjs/throttler";


@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {
    getRequestResponse(context: ExecutionContext) {
        if (context.getType() === 'http') {
            return super.getRequestResponse(context);
        }
        const gqlCtx = GqlExecutionContext.create(context);
        const ctx = gqlCtx.getContext();
        return { req: ctx.req, res: ctx.res };
    }
}
