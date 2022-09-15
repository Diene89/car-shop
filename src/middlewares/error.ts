import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { errorCatalog, ErrorTypes } from './errorCatalog';

const errorMiddleware: ErrorRequestHandler = (err: Error, _req, res, _next) => {
  console.log(err, 'meu errooooooooo');
  if (err instanceof ZodError) { return res.status(400).json(err.issues); }

  const messageAsErrorType = err.message as keyof typeof ErrorTypes;

  const mappedError = errorCatalog[messageAsErrorType];
  if (mappedError) {
    const { httpStatus, message } = mappedError;
    return res.status(httpStatus).json({ error: message });
  }

  return res.status(500).json({ message: 'internal error' });
};

export default errorMiddleware;
