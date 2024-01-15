import { type Request, type Response } from 'express'
import { type RetrieveCoursesRequest } from '../models/types/course'
import CourseService from '../services/courseService'
import CourseTransformer from '../transformers/courseTransformer'
import { type RequestWithQueryParams } from '../middleware/middleware'

class CourseController {
  static async retrieveCourses (req: RequestWithQueryParams<RetrieveCoursesRequest>, res: Response) {
    const request = req.queryParams!
    console.log(request)
    const courses = await CourseService.retrieveCourses(request)
    res.status(200).json(CourseTransformer.toCoursesDTO(courses))
  }

  static async retrieveCourse (req: Request, res: Response) {
    const courseId = req.params.courseId
    const course = await CourseService.retrieveCourseDetails(courseId)
    res.status(200).json(CourseTransformer.toCourseDetailsDTO(course))
  }

  static async getAvailableCourses(req: Request, res: Response) {

    const courses = await CourseService.getAvailableCourses();
    return res.status(200).json(CourseTransformer.toCoursesDTO(courses));
  }

}

export default CourseController
