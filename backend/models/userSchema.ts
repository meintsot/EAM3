import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'
import userProfileSchema from './userProfileSchema'
import { type User } from './types/user'

const userSchema = new Schema<User>({
  userName: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
    maxLength: 30
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 32
  },
  userProfile: {
    type: userProfileSchema,
    required: false
  },
  userType: {
    type: String,
    required: true
  }
})

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  }
  next()
})

export default model('User', userSchema)
