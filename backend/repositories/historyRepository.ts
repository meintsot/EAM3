import { type FilterQuery } from 'mongoose'
import { type UserHistory } from '../models/types/userHistory'
import UserHistoryModel from '../models/historySchema'

class HistoryRepository {
  static async findByCriteria (criteria: FilterQuery<History>, paginationRequest: PaginationRequest): Promise<UserHistory[]> {
    const skip = (paginationRequest.page - 1) * paginationRequest.pageSize
    return await UserHistoryModel.find(criteria).sort({ _id: -1 }).skip(skip).limit(paginationRequest.pageSize).lean()
  }

  static async countByCriteria (criteria: FilterQuery<History>): Promise<number> {
    return await UserHistoryModel.countDocuments(criteria).exec()
  }

  static async saveHistory (history: UserHistory): Promise<UserHistory> {
    return await UserHistoryModel.create(history)
  }
}

export default HistoryRepository
