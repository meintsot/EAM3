import type mongoose from 'mongoose'

interface CoursesForDeclaration {
  courseId: string
  courseName: string
}

interface Declaration {
  _id?: string | mongoose.ObjectId
  studentId: string | mongoose.ObjectId
  examPeriod: string
  state: string
  courses: CoursesForDeclaration[]
}

interface DeclarationDetailsDTO {
  _id: string
  examPeriod: string
  state: string
  courses: CoursesForDeclaration[]
}

interface DeclarationDTO {
  _id: string
  examPeriod: string
  state: string
}

interface RetrieveDeclarationsRequest extends PaginationRequest {
  examPeriod?: string
  state?: string
}

interface RetrieveDeclarationsResponse {
  declarations: DeclarationDTO[]
  total: number
}

type SubmitDeclarationRequest = Omit<Declaration, '_id' | 'state' | 'studentId'>
