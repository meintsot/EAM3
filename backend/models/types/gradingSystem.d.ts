import type mongoose from 'mongoose'

interface StudentGradingDetails {
  registrationNumber: string
  firstName: string
  lastName: string
  grade: number
}

interface GradingSystem {
  _id?: mongoose.ObjectId | string
  courseName: string
  courseId: string
  state: string
  examPeriod: string
  students: StudentGradingDetails[]
  teacherId: mongoose.ObjectId | string
}

type GradingSystemDTO = Omit<GradingSystem, 'students' | 'teacherId'>

type GradingSystemDetailsDTO = Omit<GradingSystem, 'teacherId'>

interface RetrieveGradingSystemRequest extends PaginationRequest {
  courseName?: string
  courseId?: string
  state?: string
  examPeriod?: string
}

type SubmitGradingSystemRequest = Omit<GradingSystem, '_id' | 'teacherId'>

interface RetrieveStudentGradesRequest extends PaginationRequest {
  courseId?: string
  examPeriod?: string
}
