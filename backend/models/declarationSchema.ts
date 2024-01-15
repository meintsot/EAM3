import mongoose, { model, Schema } from 'mongoose'
import { type Declaration } from './types/declaration'

const declarationSchema = new mongoose.Schema<Declaration>({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  examPeriod: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  courses: [
    {
      courseId: {
        type: String,
        required: true
      },
      courseName: {
        type: String,
        required: true
      }
    }
  ]
})

export default model('Declaration', declarationSchema)
