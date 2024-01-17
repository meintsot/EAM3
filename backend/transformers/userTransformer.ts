import { type User, type RegisterUserDTO, type LoginUserResponseDTO } from '../models/types/user'
import { type UserProfileDTO } from '../models/types/userProfile'
import { type RetrieveUserHistoryResponse, type UserHistory, type UserHistoryDTO } from '../models/types/userHistory'

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

  static toRetrieveUserHistoryResponse (history: UserHistory[], total: number): RetrieveUserHistoryResponse {
    return {
      userHistory: UserTransformer.toUserHistoryDTO(history),
      total
    }
  }

  static toUserHistoryDTO (history: UserHistory[]): UserHistoryDTO[] {
    return history.map(UserTransformer.toHistoryDTO)
  }

  static toHistoryDTO (history: UserHistory): UserHistoryDTO {
    return {
      date: history.date.toTimeString(),
      action: history.action
    }
  }
}

export default UserTransformer
