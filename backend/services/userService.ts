import { type LoginUserRequestDTO, type RegisterUserDTO, type User } from '../models/types/user'
import UserRepository from '../repositories/userRepository'
import dotenv from 'dotenv'
import AuthUtils from '../middleware/authUtils'
import CourseRepository from '../repositories/courseRepository'
import { type UserHistory } from '../models/types/userHistory'
import HistoryRepository from '../repositories/historyRepository'
import { HistoryActions } from '../models/historyActions'
import { type UpdateUserProfileRequest } from '../models/types/userProfile'
import BackendError from '../fault/backendError'
import ReasonType from '../fault/types/reason-type.enum'

dotenv.config()

class UserService {
  private static buildUser (req: RegisterUserDTO): User {
    return {
      userName: req.userName,
      password: req.password ?? '',
      userType: req.userType,
      userProfile: {
        studentId: `111520${req.userName.replace(/^sdi/, '')}`,
        yearOfStudy: 1,
        gpa: 0,
        generalInformation: req.userProfile.generalInformation,
        personalInformation: {
          ...req.userProfile.personalInformation
        },
        communicationDetails: req.userProfile.communicationDetails
      },
      certificates: []
    }
  }

  static async register (user: RegisterUserDTO): Promise<{ courseIds?: string[], user: User, token: string }> {
    if ((user.password == null) || user.password.length < 8) {
      throw new BackendError(ReasonType.PASSWORD_FORMAT, 400)
    }
    if (user.password !== user.confirmPassword) {
      throw new BackendError(ReasonType.PASSWORD_MATCH, 400)
    }
    const userToSave = this.buildUser(user)
    const savedUser = await UserRepository.saveUser(userToSave)
    if (user.userType === 'teacher') {
      const courseIds = user.myCourses ?? []
      await CourseRepository.updateManyByCriteria({ courseId: { $in: courseIds } }, { teacherId: savedUser._id as string, teacherName: savedUser.userName })
      const token = AuthUtils.generateJWT({ userId: (savedUser._id as string), userType: savedUser.userType })
      await HistoryRepository.saveHistory({ userId: savedUser._id!, action: HistoryActions.REGISTER, date: new Date() })
      return { user: savedUser, courseIds, token }
    }
    const token = AuthUtils.generateJWT({ userId: (savedUser._id as string), userType: savedUser.userType })
    await HistoryRepository.saveHistory({ userId: savedUser._id!, action: HistoryActions.REGISTER, date: new Date() })
    return { user: savedUser, token }
  };

  static async login (req: LoginUserRequestDTO): Promise<{ courseIds?: string[], user: User, token: string }> {
    try {
      const user = await UserRepository.findOneByCriteria({ userName: req.userName })
      const isPasswordValid = await AuthUtils.checkPassword(user, req.password)
      if (!isPasswordValid) {
        throw new BackendError(ReasonType.INVALID_CREDENTIALS, 401)
      }

      if (user.userType === 'teacher') {
        const courses = await CourseRepository.findByCriteria({ teacherId: user._id })
        const courseIds = courses.map(course => course.courseId)
        const token = AuthUtils.generateJWT({ userId: (user._id as string), userType: user.userType })
        await HistoryRepository.saveHistory({ userId: user._id!, action: HistoryActions.LOGIN, date: new Date() })
        return { user, courseIds, token }
      }
      const token = AuthUtils.generateJWT({ userId: (user._id as string), userType: user.userType })
      await HistoryRepository.saveHistory({ userId: user._id!, action: HistoryActions.LOGIN, date: new Date() })
      return { user, token }
    } catch (e) {
      throw new BackendError(ReasonType.INVALID_CREDENTIALS, 401)
    }
  }

  static async retrieveUserHistory (request: PaginationRequest, user: User): Promise<UserHistory[]> {
    return await HistoryRepository.findByCriteria({ userId: user._id }, request)
  }

  static async countUserHistory (user: User): Promise<number> {
    return await HistoryRepository.countByCriteria({ userId: user._id })
  }

  static async updateUserProfile (request: UpdateUserProfileRequest, user: User): Promise<{ user: User, courseIds?: string[] }> {
    user.userProfile.generalInformation.phoneNumber = request.phoneNumber
    user.userProfile.generalInformation.profilePicture = request.profilePicture
    user.userProfile.personalInformation = request.personalInformation
    user.userProfile.communicationDetails = request.communicationDetails
    const newUser = await UserRepository.updateUser(user._id as string, user)
    if (user.userType === 'teacher') {
      const courseIds = request.myCourses ?? []
      await HistoryRepository.saveHistory({ userId: user._id!, action: HistoryActions.UPDATE_PROFILE, date: new Date() })
      await CourseRepository.updateManyByCriteria({ courseId: { $in: courseIds } }, { teacherId: user._id as string, teacherName: user.userName })
      return { user: newUser, courseIds }
    }
    await HistoryRepository.saveHistory({ userId: user._id!, action: HistoryActions.UPDATE_PROFILE, date: new Date() })
    return { user: newUser }
  }
}

export default UserService
