import express from 'express'
import AuthMiddleware from '../middleware/authMiddleware'
import { type RetrieveStudentGradesRequest } from '../models/types/studentGrade'
import StudentGradeController from '../controllers/studentGradeController'

const router = express.Router()

router.get('/studentGrades', AuthMiddleware.authenticateJWT, AuthMiddleware.rolesAllowed(['student']),
    AuthMiddleware.queryParamsMiddleware<RetrieveStudentGradesRequest>, StudentGradeController.retrieveStudentGrades)

export default router
