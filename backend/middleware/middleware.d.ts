import { type Request } from 'express'
import { type User } from '../models/types/user'

interface AuthenticatedRequest extends Request {
  user?: User
}

interface RequestWithQueryParams<T> extends Request {
  queryParams?: T
}

interface AuthenticatedRequestWithQueryParams<T> extends AuthenticatedRequest, RequestWithQueryParams<T> {}
