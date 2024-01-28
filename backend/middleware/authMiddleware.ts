import jwt from 'jsonwebtoken'
import { type Response, type NextFunction } from 'express'
import UserModel from '../models/userSchema'
import { type AuthenticatedRequest, type RequestWithQueryParams } from './middleware'
import QueryParamTypes from './queryParams'
import BackendError from '../fault/backendError'
import ReasonType from '../fault/types/reason-type.enum'

class AuthMiddleware {
  static async authenticateJWT (req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if (authHeader != null) {
      const token = authHeader.split(' ')[1]

      const { userId } = jwt.verify(token, process.env.JWT_SECRET ?? '') as UserJWT

      const foundUser = await UserModel.findById(userId)

      if (foundUser == null) {
        throw new BackendError(ReasonType.UNAUTHORIZED, 401)
      }

      req.user = foundUser
      next()
    } else {
      throw new BackendError(ReasonType.UNAUTHORIZED, 401)
    }
  }

  static async loginJWTRequest (req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if (authHeader != null) {
      const token = authHeader.split(' ')[1]

      try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET ?? '') as UserJWT

        const foundUser = await UserModel.findById(userId)

        if (foundUser == null) {
          next()
          return
        }

        req.user = foundUser
        next()
      } catch (err) {
        next()
      }
      next()
    }
    next()
  }

  static rolesAllowed = (roles: string[]) => (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (req.user == null) {
      throw new BackendError(ReasonType.NO_PERMISSION, 403)
    }
    if (!(req.user.userType in roles)) {
      throw new BackendError(ReasonType.NO_PERMISSION, 403)
    }
  }

  private static convertQueryParams<T>(query: any): T {
    const result: any = {}
    for (const key in query) {
      if (!Object.prototype.hasOwnProperty.call(query, key)) continue
      if (QueryParamTypes[key] === 'boolean') {
        result[key] = query[key] === 'true'
      } else if (QueryParamTypes[key] === 'number') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        result[key] = parseInt(query[key])
      } else {
        result[key] = query[key]
      }
    }
    return result as T
  }

  static queryParamsMiddleware<T>(req: RequestWithQueryParams<T>, res: Response, next: NextFunction) {
    req.queryParams = AuthMiddleware.convertQueryParams<T>(req.query)
    next()
  }
}

export default AuthMiddleware
