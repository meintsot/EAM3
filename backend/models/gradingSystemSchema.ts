import mongoose from 'mongoose'
import { type GradingSystem } from './types/gradingSystem'

const gradingSystemSchema: mongoose.Schema<GradingSystem> = new mongoose.Schema({
  courseName: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  examPeriod: {
    type: String,
    required: true
  },
  students: [
    {
      registrationNumber: {
        type: String,
        required: true
      },
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      grade: {
        type: Number,
        required: true
      }
    }
  ],
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

export default mongoose.model('GradingSystem', gradingSystemSchema)
