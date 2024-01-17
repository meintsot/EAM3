import { type Course, type RetrieveCoursesRequest, type RetrieveMyCoursesRequest } from '../models/types/course'
import CourseRepository from '../repositories/courseRepository'
import type mongoose from 'mongoose'
import { type User } from '../models/types/user'

class CourseService {
  static async retrieveCourses (request: RetrieveCoursesRequest): Promise<Course[]> {
    return await CourseRepository.findByCriteria(request, request as PaginationRequest)
  }

  static async countCourses (request: RetrieveCoursesRequest): Promise<number> {
    const { page, pageSize, ...criteria } = request
    return await CourseRepository.countByCriteria(criteria)
  }

  static async retrieveCourseDetails (courseId: string): Promise<Course> {
    return await CourseRepository.findOneByCriteria({ courseId })
  }

  static async findCoursesIds (teacherId: string | mongoose.ObjectId): Promise<string[]> {
    const courses = await CourseRepository.findByCriteria({ teacherId })
    return courses.map(course => course.courseId)
  }

  static async getAvailableCourses (): Promise<Course[]> {
    return await CourseRepository.findByCriteria({
      teacher: { $exists: false }
    })
  }

  static async retrieveMyCourses (user: User, request: RetrieveMyCoursesRequest): Promise<Course[]> {
    const { pageSize, page, ...criteria } = request
    return await CourseRepository.findByCriteria({ teacherId: user._id, ...criteria }, { page, pageSize })
  }

  static async countMyCourses (user: User, request: RetrieveMyCoursesRequest): Promise<number> {
    const { pageSize, page, ...criteria } = request
    return await CourseRepository.countByCriteria({ teacherId: user._id, ...criteria })
  }
}

export default CourseService
