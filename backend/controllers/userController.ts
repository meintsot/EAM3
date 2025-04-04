import { type NextFunction, type Request, type Response } from 'express'
import UserService from '../services/userService'
import { type LoginUserRequestDTO, type RegisterUserDTO } from '../models/types/user'
import UserTransformer from '../transformers/userTransformer'
import { type AuthenticatedRequest, type AuthenticatedRequestWithQueryParams } from '../middleware/middleware'
import AuthUtils from '../middleware/authUtils'
import CourseService from '../services/courseService'
import { type UpdateUserProfileRequest } from '../models/types/userProfile'

class UserController {
  static async registerUser (req: Request, res: Response, next: NextFunction) {
    try {
      const request = (req.body as RegisterUserDTO)
      const { user, token, courseIds } = await UserService.register(request)
      res.status(201).json(UserTransformer.toRegisterUserDTO(user, token, courseIds))
    } catch (err) {
      next(err)
    }
  }

  static async loginUser (req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (req.user == null) {
        const request = req.body as LoginUserRequestDTO
        const { user, token, courseIds } = await UserService.login(request)
        res.status(200).json(UserTransformer.toLoginUserDTO(user, token, courseIds))
      } else {
        const token = AuthUtils.generateJWT({ userId: req.user._id as string, userType: req.user.userType })
        const user = req.user
        if (user.userType === 'teacher') {
          const courseIds = await CourseService.findCoursesIds(user._id as string)
          return res.status(200).json(UserTransformer.toLoginUserDTO(user, token, courseIds))
        }
        res.status(200).json(UserTransformer.toLoginUserDTO(req.user, token))
      }
    } catch (err) {
      next(err)
    }
  }

  static async retrieveUserHistory (req: AuthenticatedRequestWithQueryParams<PaginationRequest>, res: Response, next: NextFunction) {
    try {
      const history = await UserService.retrieveUserHistory(req.queryParams!, req.user!)
      const total = await UserService.countUserHistory(req.user!)
      return res.status(200).json(UserTransformer.toRetrieveUserHistoryResponse(history, total))
    } catch (err) {
      next(err)
    }
  }

  static async updateUserProfile (req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const request = req.body as UpdateUserProfileRequest
      const { user, courseIds } = await UserService.updateUserProfile(request, req.user!)
      return res.status(201).json(UserTransformer.toUpdateUserProfileResponse(user, courseIds))
    } catch (err) {
      next(err)
    }
  }
}

export default UserController
