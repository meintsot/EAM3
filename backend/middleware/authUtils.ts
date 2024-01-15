import jwt from 'jsonwebtoken'
import { type User } from '../models/types/user'
import bcrypt from 'bcrypt'

class AuthUtils {
  static generateJWT (data: UserJWT) {
    return jwt.sign(data, process.env.JWT_SECRET ?? '')
  }

  static async checkPassword (user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password)
  }
}

export default AuthUtils
