import { type Request, type Response } from 'express'
import { type MyCoursesRequest, type RetrieveCoursesRequest } from '../models/types/course'
import CourseService from '../services/courseService'
import CourseTransformer from '../transformers/courseTransformer'
import { type AuthenticatedRequestWithQueryParams, type RequestWithQueryParams } from '../middleware/middleware'

class CourseController {
  static async retrieveCourses (req: RequestWithQueryParams<RetrieveCoursesRequest>, res: Response) {
    const request = req.queryParams!
    const courses = await CourseService.retrieveCourses(request)
    const total = await CourseService.countCourses(request)
    res.status(200).json(CourseTransformer.toRetrieveCoursesResponse(courses, total))
  }

  static async retrieveCourse (req: Request, res: Response) {
    const courseId = req.params.courseId
    const course = await CourseService.retrieveCourseDetails(courseId)
    res.status(200).json(CourseTransformer.toCourseDetailsDTO(course))
  }

  static async getAvailableCourses (req: Request, res: Response) {
    const courses = await CourseService.getAvailableCourses()
    return res.status(200).json(CourseTransformer.toCoursesDTO(courses))
  }

  static async myCourses (req: AuthenticatedRequestWithQueryParams<MyCoursesRequest>, res: Response) {
    const request = req.queryParams!
    const myCourses = await CourseService.myCourses(request, req.user!)
    const total = await CourseService.countMyCourses(request, req.user!)
    res.status(200).json(CourseTransformer.toMyCoursesResponse(myCourses, total))
  }
}

export default CourseController
