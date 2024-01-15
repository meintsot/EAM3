import { type User } from '../models/types/user'
import { type RetrieveStudentGradesRequest, type StudentGrade } from '../models/types/studentGrade'
import StudentGradeRepository from '../repositories/studentGradeRepository'

class StudentGradeService {
  static async retrieveStudentGrades (request: RetrieveStudentGradesRequest, user: User): Promise<StudentGrade[]> {
    const { pageSize, page, ...criteria } = request
    return await StudentGradeRepository.findByCriteria({ ...criteria, studentId: user.userName }, { page, pageSize } satisfies PaginationRequest)
  }
}

export default StudentGradeService
