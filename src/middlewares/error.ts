import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) { return res.status(400).json(err.issues); }
};

export default errorMiddleware;