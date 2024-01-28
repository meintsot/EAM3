import {
  type GradingSystem,
  type RetrieveGradingSystemRequest,
  type SubmitGradingSystemRequest
} from '../models/types/gradingSystem'
import GradingSystemRepository from '../repositories/gradingSystemRepository'
import { type User } from '../models/types/user'
import CourseRepository from '../repositories/courseRepository'
import StudentGradeRepository from '../repositories/studentGradeRepository'
import { type StudentGrade } from '../models/types/studentGrade'
import HistoryRepository from '../repositories/historyRepository'
import { HistoryActions } from '../models/historyActions'

class GradingSystemService {
  static buildStudentGrades (request: SubmitGradingSystemRequest, ects: string): StudentGrade[] {
    return request.students.map((student) => {
      return {
        studentId: student.registrationNumber,
        courseId: request.courseId,
        examPeriod: request.examPeriod,
        ects,
        grade: student.grade
      } satisfies StudentGrade
    })
  }

  static async retrieveGradingSystems (request: RetrieveGradingSystemRequest, user: User): Promise<GradingSystem[]> {
    return await GradingSystemRepository.findByCriteria({ ...request, teacherId: user._id }, request as PaginationRequest)
  }

  static async countGradingSystems ({ page, pageSize, ...criteria }: RetrieveGradingSystemRequest, user: User): Promise<number> {
    return await GradingSystemRepository.countByCriteria({ ...criteria, teacherId: user._id })
  }

  static async retrieveGradingSystemDetails (gradingSystemId: string, user: User): Promise<GradingSystem> {
    return await GradingSystemRepository.findOneByCriteria({ _id: gradingSystemId, teacherId: user._id })
  }

  static async submitGradingSystemRequest (request: SubmitGradingSystemRequest, user: User): Promise<GradingSystem> {
    const res = await GradingSystemRepository.saveGradingSystem({ ...request, teacherId: user._id!, state: 'Προσωρινή αποθήκευση' })
    await HistoryRepository.saveHistory({ userId: user._id!, action: HistoryActions.SUBMIT_GRADING_SYSTEM, date: new Date() })
    return res
  }

  static async confirmGradingSystem (gradingSystemId: string, gradingSystem: SubmitGradingSystemRequest, user: User): Promise<GradingSystem> {
    gradingSystem.state = 'Οριστική υποβολή'
    const res = await GradingSystemRepository.updateGradingSystem(gradingSystemId, gradingSystem)
    const course = await CourseRepository.findOneByCriteria({ courseId: res.courseId })
    const studentGrades = GradingSystemService.buildStudentGrades(res, course.ects.toString())
    await StudentGradeRepository.saveStudentGrades(studentGrades)
    await HistoryRepository.saveHistory({ userId: user._id!, action: HistoryActions.CONFIRM_GRADING_SYSTEM, date: new Date() })
    return res
  }
}

export default GradingSystemService
