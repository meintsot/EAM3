import mongoose from 'mongoose'
import { type StudentGrade } from './types/studentGrade'

const studentGradeSchema: mongoose.Schema<StudentGrade> = new mongoose.Schema({
  studentId: {
    type: String,
    required: true
  },
  courseId: {
    type: String,
    required: true
  },
  examPeriod: {
    type: String,
    required: true
  },
  ects: {
    type: String,
    required: true
  },
  grade: {
    type: Number,
    required: true
  }
})

export default mongoose.model('StudentGrade', studentGradeSchema)
