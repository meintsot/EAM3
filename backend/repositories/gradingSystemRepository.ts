import { type FilterQuery, type UpdateQuery } from 'mongoose'
import { type GradingSystem } from '../models/types/gradingSystem'

import GradingSystemModel from '../models/gradingSystemSchema'
import BackendError from '../fault/backendError'
import ReasonType from '../fault/types/reason-type.enum'

class GradingSystemRepository {
  static async findByCriteria (criteria: FilterQuery<GradingSystem>, paginationRequest: PaginationRequest): Promise<GradingSystem[]> {
    const adjustedCriteria: FilterQuery<GradingSystem> = {}
    for (const key in criteria) {
      if (Object.prototype.hasOwnProperty.call(criteria, key)) {
        const value = criteria[key]
        if (key === 'pageSize' || key === 'page') {
          continue
        }
        if (typeof value === 'string') {
          // Use a regular expression for partial matching
          adjustedCriteria[key] = new RegExp(value, 'i')
        } else {
          // For non-string fields, use the original criteria
          adjustedCriteria[key] = value
        }
      }
    }

    const skip = (paginationRequest.page - 1) * paginationRequest.pageSize
    return await GradingSystemModel.find(adjustedCriteria).skip(skip).limit(paginationRequest.pageSize)
  }

  static async countByCriteria (criteria: FilterQuery<GradingSystem>): Promise<number> {
    const adjustedCriteria: FilterQuery<GradingSystem> = {}
    for (const key in criteria) {
      if (Object.prototype.hasOwnProperty.call(criteria, key)) {
        const value = criteria[key]
        if (key === 'pageSize' || key === 'page') {
          continue
        }
        if (typeof value === 'string') {
          // Use a regular expression for partial matching
          adjustedCriteria[key] = new RegExp(value, 'i')
        } else {
          // For non-string fields, use the original criteria
          adjustedCriteria[key] = value
        }
      }
    }

    return await GradingSystemModel.countDocuments(adjustedCriteria).exec()
  }

  static async findOneByCriteria (criteria: FilterQuery<GradingSystem>): Promise<GradingSystem> {
    const gradingSystem = await GradingSystemModel.findOne(criteria).lean()
    if (gradingSystem == null) {
      throw new BackendError(ReasonType.GRADING_SYSTEM_NOT_FOUND, 404)
    }
    return gradingSystem
  }

  static async saveGradingSystem (gradingSystem: GradingSystem): Promise<GradingSystem> {
    return await GradingSystemModel.create(gradingSystem)
  }

  static async updateGradingSystem (gradingSystemId: string, gradingSystem: UpdateQuery<GradingSystem>): Promise<GradingSystem> {
    const newGradingSystem = await GradingSystemModel.findOneAndUpdate({ _id: gradingSystemId }, gradingSystem, { new: true }).lean()
    if (newGradingSystem == null) {
      throw new BackendError(ReasonType.GRADING_SYSTEM_NOT_FOUND, 404)
    }
    return newGradingSystem
  }
}

export default GradingSystemRepository
