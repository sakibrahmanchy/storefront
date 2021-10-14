import { Response } from 'express';
import { Injectable } from '@nestjs/common';

export interface ResponseModel {
  message: string[] | string;
  status: string;
  code: number;
  data: any;
}

@Injectable()
export class ApiResponseService {
  response(
    message: string[] | string,
    status: string,
    code: number,
    data: any[] | any,
    res: Response,
  ): Response<ResponseModel> {
    return res.status(200).json({
      message,
      status,
      code,
      data,
    });
  }

  successResponse(
    message: string[] | string,
    data: any,
    res: Response,
  ): Response<ResponseModel> {
    return res.status(200).json({
      message,
      success: true,
      status: 'success',
      code: 200,
      data,
    });
  }

  notFoundError(
    message: string | string[] | null = 'The requested resource is not found.',
    res: Response,
  ): Response<ResponseModel> {
    return res.status(404).json({
      success: false,
      error: {
        message,
      },
    });
  }

  badRequestError(
    message: string[] | string,
    res: Response,
  ): Response<ResponseModel> {
    return res.status(400).json({
      success: false,
      message,
    });
  }

  unAuthorizedError(
    message: string[] | string,
    res: Response,
  ): Response<ResponseModel> {
    message = ['Sorry! You are not authorized to perform this action'];
    return res.status(401).json({
      success: false,
      message,
    });
  }

  forbiddenError(
    message: string[] | string,
    res: Response,
  ): Response<ResponseModel> {
    message = ['Sorry! You do not have permission to perform this action'];
    return res.status(403).json({
      success: false,
      message,
    });
  }

  internalServerError(
    message: string[] | string,
    res: Response,
  ): Response<ResponseModel> {
    message = ['Something went wrong. Please try again later.'];
    return res.status(500).json({
      success: false,
      message,
    });
  }
}
