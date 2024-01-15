import { type User } from '../models/types/user'
import UserModel from '../models/userSchema'
import { type FilterQuery } from 'mongoose'

class UserRepository {
  static async saveUser (user: User): Promise<User> {
    return await UserModel.create(user)
  }

  static async findOneByCriteria (criteria: FilterQuery<User>): Promise<User> {
    const foundUser = await UserModel.findOne(criteria).lean()
    if (foundUser == null) {
      throw new Error('User not found')
    }
    return foundUser
  }
}

export default UserRepository
