import { type User } from '../models/types/user'
import UserModel from '../models/userSchema'
import { type FilterQuery, type UpdateQuery } from 'mongoose'
import BackendError from '../fault/backendError'
import ReasonType from '../fault/types/reason-type.enum'

class UserRepository {
  static async saveUser (user: User): Promise<User> {
    return await UserModel.create(user)
  }

  static async findOneByCriteria (criteria: FilterQuery<User>): Promise<User> {
    const foundUser = await UserModel.findOne(criteria).lean()
    if (foundUser == null) {
      throw new BackendError(ReasonType.USER_NOT_FOUND, 401)
    }
    return foundUser
  }

  static async updateUser (userId: string, user: UpdateQuery<User>): Promise<User> {
    const newUser = await UserModel.findOneAndUpdate({ _id: userId }, user, { new: true }).lean()
    if (newUser == null) {
      throw new BackendError(ReasonType.USER_NOT_FOUND, 404)
    }
    return newUser
  }
}

export default UserRepository
