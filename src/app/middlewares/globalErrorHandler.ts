/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { Error } from 'mongoose';
import { ZodError } from 'zod';
import { TErrorSources } from '../interface/error';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleDuplicateCastError from '../errors/handleDuplicateError';
import config from '../config';
import AppError from '../errors/AppError';
import handleCastError from '../errors/handleCastError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 400;
  let message = 'Error message describing the issue';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong!!!',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: '',
        message: 'Something went wrong!!!',
      },
    ];
  }

  // common response
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error: errorSources,
    // err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
  return;
};

export default globalErrorHandler;
