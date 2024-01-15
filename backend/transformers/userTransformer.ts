import { type User, type RegisterUserDTO, type LoginUserResponseDTO } from '../models/types/user'
import { type UserProfileDTO } from '../models/types/userProfile'
import { type UserHistory, type UserHistoryDTO } from '../models/types/userHistory'

class UserTransformer {
  static toRegisterUserDTO (user: User, token: string, courseIds?: string[]): RegisterUserDTO {
    return {
      userName: user.userName,
      userType: user.userType,
      userProfile: (user.userProfile as UserProfileDTO),
      myCourses: courseIds,
      authToken: token
    }
  }

  static toLoginUserDTO (user: User, token: string, courseIds?: string[]): LoginUserResponseDTO {
    return {
      userName: user.userName,
      userType: user.userType,
      userProfile: (user.userProfile as UserProfileDTO),
      myCourses: courseIds,
      authToken: token
    }
  }

  static toUserHistoryDTO (history: UserHistory[]): UserHistoryDTO[] {
    return history.map(UserTransformer.toHistoryDTO)
  }

  static toHistoryDTO (history: UserHistory): UserHistoryDTO {
    return {
      date: history.date.toDateString(),
      action: history.action
    }
  }
}

export default UserTransformer
