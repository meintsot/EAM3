import { type RetrieveStudentGrades, type StudentGrade, type StudentGradeDTO } from '../models/types/studentGrade'

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

  static toRetrieveStudentGrades (studentGrades: StudentGrade[], total: number): RetrieveStudentGrades {
    return {
      studentGrades: this.toStudentGradesDTO(studentGrades),
      total
    }
  }
}

export default StudentGradeTransformer
