import { type StudentGrade, type StudentGradeDTO } from '../models/types/studentGrade'

class StudentGradeTransformer {
  static toStudentGradesDTO (studentGrades: StudentGrade[]): StudentGradeDTO[] {
    return studentGrades.map(StudentGradeTransformer.toStudentGradeDTO)
  }

  static toStudentGradeDTO (studentGrade: StudentGrade): StudentGradeDTO {
    return {
      courseId: studentGrade.courseId,
      examPeriod: studentGrade.examPeriod,
      ects: studentGrade.ects,
      grade: studentGrade.grade
    }
  }
}

export default StudentGradeTransformer
