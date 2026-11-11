import { NextFunction, Request, Response, RequestHandler } from 'express'

export function wrapRequestHandler(fn: RequestHandler) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
