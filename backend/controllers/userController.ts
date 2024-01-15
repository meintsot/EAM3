import { type Request, type Response } from 'express'
import UserService from '../services/userService'
import { type LoginUserRequestDTO, type RegisterUserDTO } from '../models/types/user'
import UserTransformer from '../transformers/userTransformer'
import { type AuthenticatedRequest, type AuthenticatedRequestWithQueryParams } from '../middleware/middleware'
import AuthUtils from '../middleware/authUtils'
import CourseService from '../services/courseService'

class UserController {
  static async registerUser (req: Request, res: Response) {
    const request = (req.body as RegisterUserDTO)
    try {
      const { user, token, courseIds } = await UserService.register(request)
      res.status(201).json(UserTransformer.toRegisterUserDTO(user, token, courseIds))
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }

  static async loginUser (req: AuthenticatedRequest, res: Response) {
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
  }

  static async RetrieveUserHistory (req: AuthenticatedRequestWithQueryParams<PaginationRequest>, res: Response) {
    const history = await UserService.retrieveUserHistory(req.queryParams!, req.user!)
    res.status(200).json(UserTransformer.toUserHistoryDTO(history))
  }
}

export default UserController
