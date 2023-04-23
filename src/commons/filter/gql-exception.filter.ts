import {
  ArgumentsHost,
  Catch,
  ContextType,
  ExceptionFilter,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ApolloError } from 'apollo-server-core';

@Catch(Error)
@Injectable()
export class GqlExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    if (host.getType() === ('graphql' as ContextType)) {
      if (exception instanceof ApolloError) {
        this.logger.error(
          exception.message,
          JSON.stringify({
            code: exception.extensions.code,
            status: exception.extensions.exception.status,
            message: exception.extensions.exception.message,
          }),
        );
        throw exception;
      } else if (exception instanceof HttpException) {
        this.logger.error({
          code: exception.getStatus(),
          message: exception.message,
        });
        throw exception;
      }
    }
  }
}
