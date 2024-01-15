import type mongoose from 'mongoose'

interface StudentGrade {
  _id?: mongoose.Schema.Types.ObjectId | string
  studentId: string
  courseId: string
  examPeriod: string
  ects: string
  grade: number
}

type StudentGradeDTO = Omit<StudentGrade, '_id' | 'studentId'>

interface RetrieveStudentGradesRequest extends PaginationRequest {
  courseId?: string
  examPeriod?: string
  ects?: string
  grade?: number
}
