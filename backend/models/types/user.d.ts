import type mongoose from 'mongoose'
import { type UserProfile, type UserProfileDTO } from './userProfile'

interface User {
  _id?: mongoose.ObjectId | string
  userName: string
  password: string
  userType: string
  userProfile: UserProfile
  certificates: string[]
}

interface RegisterUserDTO {
  userName: string
  password?: string
  confirmPassword?: string
  userType: string
  userProfile: UserProfileDTO
  myCourses?: string[]
  authToken?: string
}

interface LoginUserRequestDTO {
  userName: string
  password: string
}

interface LoginUserResponseDTO {
  userName: string
  userType: string
  userProfile: UserProfileDTO
  myCourses?: string[]
  authToken?: string
}

interface UpdateUserProfileResponse {
  userName: string
  userType: string
  userProfile: UserProfileDTO
  myCourses?: string[]
}
