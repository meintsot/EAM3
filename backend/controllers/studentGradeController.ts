import { type AuthenticatedRequestWithQueryParams } from '../middleware/middleware'
import { type RetrieveStudentGradesRequest } from '../models/types/studentGrade'
import { type NextFunction, type Response } from 'express'
import StudentGradeService from '../services/studentGradeService'
import StudentGradeTransformer from '../transformers/studentGradeTransformer'

class StudentGradeController {
  static async retrieveStudentGrades (req: AuthenticatedRequestWithQueryParams<RetrieveStudentGradesRequest>, res: Response, next: NextFunction) {
    try {
      const request = req.queryParams!
      const studentGrades = await StudentGradeService.retrieveStudentGrades(request, req.user!)
      const total = await StudentGradeService.countStudentGrades(request, req.user!)
      res.status(200).json(StudentGradeTransformer.toRetrieveStudentGrades(studentGrades, total))
    } catch (err) {
      next(err)
    }
  }
}

export default StudentGradeController
