import type mongoose from 'mongoose'

interface UserHistory {
  _id?: mongoose.Schema.Types.ObjectId | string
  userId: mongoose.Schema.Types.ObjectId | string
  date: Date
  action: string
}

type UserHistoryDTO = Omit<UserHistory, '_id' | 'userId' | 'date'> & {
  date: string
}
