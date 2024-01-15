import express from 'express'
import CourseController from '../controllers/courseController'
import AuthMiddleware from '../middleware/authMiddleware'
import { type RetrieveCoursesRequest } from '../models/types/course'

const router = express.Router()

router.get('/courses', AuthMiddleware.queryParamsMiddleware<RetrieveCoursesRequest>, CourseController.retrieveCourses)
router.get('/courses/:courseId', CourseController.retrieveCourse)
router.get('/availableCourses', CourseController.getAvailableCourses);

export default router
