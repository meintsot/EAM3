import {type Course, MyCoursesRequest, type RetrieveCoursesRequest} from '../models/types/course'
import CourseRepository from '../repositories/courseRepository'
import type mongoose from 'mongoose'
import {User} from "../models/types/user";

class CourseService {
  static async retrieveCourses (request: RetrieveCoursesRequest): Promise<Course[]> {
    return await CourseRepository.findByCriteria(request, request as PaginationRequest)
  }

  static async myCourses (request: MyCoursesRequest, user: User): Promise<Course[]> {
    const { page, pageSize, ...criteria } = request
    return await CourseRepository.findByCriteria({ ...criteria, teacherId: user._id }, { page, pageSize })
  }

  static async countMyCourses ({ page, pageSize, ...criteria }: MyCoursesRequest, user: User): Promise<number> {
    return await CourseRepository.countByCriteria({ ...criteria, teacherId: user._id })
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
}

export default CourseService
