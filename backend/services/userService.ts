import { type LoginUserRequestDTO, type RegisterUserDTO, type User } from '../models/types/user'
import UserRepository from '../repositories/userRepository'
import dotenv from 'dotenv'
import AuthUtils from '../middleware/authUtils'
import CourseRepository from '../repositories/courseRepository'
import { type UserHistory } from '../models/types/userHistory'
import HistoryRepository from '../repositories/historyRepository'
import { HistoryActions } from '../models/historyActions'

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
      throw new Error('Password must be at least 8 characters')
    }
    if (user.password !== user.confirmPassword) {
      throw new Error('Passwords do not match')
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
        throw new Error('Invalid username or password')
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
      throw new Error('Invalid username or password')
    }
  }

  static async retrieveUserHistory (request: PaginationRequest, user: User): Promise<UserHistory[]> {
    return await HistoryRepository.findByCriteria({ userId: user._id }, request)
  }
}

export default UserService
