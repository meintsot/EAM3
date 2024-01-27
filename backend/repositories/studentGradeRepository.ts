import { type FilterQuery } from 'mongoose'
import StudentGradeModel from '../models/studentGradeSchema'
import { type StudentGrade } from '../models/types/studentGrade'

class StudentGradeRepository {
  static async findByCriteria (criteria: FilterQuery<StudentGrade>, pagination: PaginationRequest): Promise<StudentGrade[]> {
    const adjustedCriteria: FilterQuery<StudentGrade> = {}

    for (const key in criteria) {
      if (Object.prototype.hasOwnProperty.call(criteria, key)) {
        const value = criteria[key]
        if (typeof value === 'string') {
          adjustedCriteria[key] = new RegExp(value, 'i')
        } else {
          adjustedCriteria[key] = value
        }
      }
    }

    const skip = (pagination.page - 1) * pagination.pageSize
    return await StudentGradeModel.find(adjustedCriteria).skip(skip).limit(pagination.pageSize)
  }

  static async countByCriteria (criteria: FilterQuery<StudentGrade>): Promise<number> {
    const adjustedCriteria: FilterQuery<StudentGrade> = {}

    for (const key in criteria) {
      if (Object.prototype.hasOwnProperty.call(criteria, key)) {
        const value = criteria[key]
        if (typeof value === 'string') {
          adjustedCriteria[key] = new RegExp(value, 'i')
        } else {
          adjustedCriteria[key] = value
        }
      }
    }

    return await StudentGradeModel.countDocuments(adjustedCriteria).exec()
  }

  static async saveStudentGrade (studentGrade: StudentGrade): Promise<StudentGrade> {
    return await StudentGradeModel.create(studentGrade)
  }

  static async saveStudentGrades (studentGrades: StudentGrade[]) {
    return await StudentGradeModel.insertMany(studentGrades)
  }
}

export default StudentGradeRepository
