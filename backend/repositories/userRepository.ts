import { type User } from '../models/types/user'
import UserModel from '../models/userSchema'
import { type FilterQuery, type UpdateQuery } from 'mongoose'

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

  static async updateUser (userId: string, user: UpdateQuery<User>): Promise<User> {
    const newUser = await UserModel.findOneAndUpdate({ _id: userId }, user, { new: true }).lean()
    if (newUser == null) {
      throw new Error('user not found')
    }
    return newUser
  }
}

export default UserRepository
