import { type NextFunction, type Request, type Response } from 'express'
import BackendError from '../fault/backendError'
import ReasonType from '../fault/types/reason-type.enum'
import { type BackendErrorType } from '../fault/types/backendError'

const errorHandlingMiddleware = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof BackendError) {
    res.status(err.details.status).json(err.details)
  } else {
    const details: BackendErrorType = {
      status: 500,
      reason: ReasonType.GENERIC_ERROR
    }
    res.status(500).json(details)
  }
}

export default errorHandlingMiddleware
