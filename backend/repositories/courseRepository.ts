import { type FilterQuery } from 'mongoose'
import CourseModel from '../models/courseSchema'
import { type Course } from '../models/types/course'

class CourseRepository {
  static async findByCriteria (criteria: FilterQuery<Course>, paginationRequest?: PaginationRequest): Promise<Course[]> {
    const adjustedCriteria: FilterQuery<Course> = {}
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

    if (paginationRequest == null) {
      return await CourseModel.find(adjustedCriteria)
    }
    const skip = (paginationRequest.page - 1) * paginationRequest.pageSize
    return await CourseModel.find(adjustedCriteria).skip(skip).limit(paginationRequest.pageSize)
  }

  static async findOneByCriteria (criteria: FilterQuery<Course>): Promise<Course> {
    const course = await CourseModel.findOne(criteria).lean()
    if (course == null) {
      throw new Error('Course not found')
    }
    return course
  }

  static async updateManyByCriteria (filterCriteria: FilterQuery<Course>, update: Partial<Course>) {
    return await CourseModel.updateMany(filterCriteria, update)
  }

  static async countByCriteria (criteria: FilterQuery<Course>): Promise<number> {
    const adjustedCriteria: FilterQuery<Course> = {}
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
    return await CourseModel.countDocuments(adjustedCriteria).exec()
  }
}

export default CourseRepository
