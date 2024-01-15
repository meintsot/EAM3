import { type Course, type RetrieveCoursesRequest } from '../models/types/course'
import CourseRepository from '../repositories/courseRepository'
import type mongoose from 'mongoose'

class CourseService {
  static async retrieveCourses (request: RetrieveCoursesRequest): Promise<Course[]> {
    return await CourseRepository.findByCriteria(request, request as PaginationRequest)
  }

  static async retrieveCourseDetails (courseId: string): Promise<Course> {
    return await CourseRepository.findOneByCriteria({ courseId })
  }

  static async findCoursesIds (teacherId: string | mongoose.ObjectId): Promise<string[]> {
    const courses = await CourseRepository.findByCriteria({ teacherId })
    return courses.map(course => course.courseId)
  }
  
  static async getAvailableCourses(): Promise<Course[]> {
    return CourseRepository.findByCriteria({
      teacher: { $exists: false } 
    });
  }
}

export default CourseService
