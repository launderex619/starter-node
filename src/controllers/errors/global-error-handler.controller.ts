import { ErrorRequestHandler } from 'express';

class GlobalErrorHandler {
  private sendError: ErrorRequestHandler = (err, req, res) => {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err.message,
      stack: err.stack,
    });
  };

  public handleErrors: ErrorRequestHandler = (err, req, res, next) => {
    console.error('An error has happended');
    this.sendError(err, req, res, next);
  };
}

export default GlobalErrorHandler;
