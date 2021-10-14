import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import {
  ApiResponseService,
  ResponseModel,
} from 'src/utils/api-response/services/api-response.service';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  constructor(private readonly apiResponseService: ApiResponseService) {}

  /** Catch response automatically and convert that to http json response */
  catch(error: Error, host: ArgumentsHost): any {
    const response = host.switchToHttp().getResponse();
    const status =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status === HttpStatus.BAD_REQUEST) {
      const res: ResponseModel = (
        error as HttpException
      ).getResponse() as ResponseModel;
      const { message } = res;
      return this.apiResponseService.badRequestError(message, response);
    }

    if (status === HttpStatus.UNAUTHORIZED) {
      return this.apiResponseService.unAuthorizedError(
        [error.message],
        response,
      );
    }
    if (status === HttpStatus.NOT_FOUND) {
      return this.apiResponseService.notFoundError(undefined, response);
    }

    return this.apiResponseService.internalServerError(
      [error.message],
      response,
    );
  }
}
