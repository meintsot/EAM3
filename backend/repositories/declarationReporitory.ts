import { type FilterQuery, type UpdateQuery } from 'mongoose'
import { type Declaration } from '../models/types/declaration'
import DeclarationModel from '../models/declarationSchema'
import BackendError from '../fault/backendError'
import ReasonType from '../fault/types/reason-type.enum'

class DeclarationRepository {
  static async findByCriteria (criteria: FilterQuery<Declaration>, paginationRequest: PaginationRequest): Promise<Declaration[]> {
    const adjustedCriteria: FilterQuery<Declaration> = {}
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
    return await DeclarationModel.find(adjustedCriteria).skip(skip).limit(paginationRequest.pageSize)
  }

  static async countByCriteria (criteria: FilterQuery<Declaration>): Promise<number> {
    const adjustedCriteria: FilterQuery<Declaration> = {}
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
    return await DeclarationModel.countDocuments(criteria)
  }

  static async findOneByCriteria (criteria: FilterQuery<Declaration>): Promise<Declaration> {
    const declaration = await DeclarationModel.findOne(criteria).lean()
    if (declaration == null) {
      throw new BackendError(ReasonType.DECLARATION_NOT_FOUND, 404)
    }
    return declaration
  }

  static async saveDeclaration (declaration: Declaration): Promise<Declaration> {
    return await DeclarationModel.create(declaration)
  }

  static async updateDeclaration (declarationId: string, declaration: UpdateQuery<Declaration>): Promise<Declaration> {
    const newDeclaration = await DeclarationModel.findOneAndUpdate({ _id: declarationId }, declaration, { new: true }).lean()
    if (newDeclaration == null) {
      throw new BackendError(ReasonType.DECLARATION_NOT_FOUND, 404)
    }
    return newDeclaration
  }
}

export default DeclarationRepository
