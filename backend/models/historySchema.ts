import mongoose from 'mongoose'
import { type UserHistory } from './types/userHistory'

const historySchema: mongoose.Schema<UserHistory> = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  action: {
    type: String,
    required: true
  }
})

export default mongoose.model('History', historySchema)
