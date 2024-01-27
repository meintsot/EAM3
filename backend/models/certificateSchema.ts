import mongoose, { model, Schema } from 'mongoose'
import { type Certificate } from './types/certificate'

const certificateSchema: mongoose.Schema<Certificate> = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  numberOfReplicas: {
    type: Number,
    required: true,
    default: 0
  },
  dateRequested: {
    type: String,
    required: true
  },
  dateRegistered: {
    type: String,
    required: false
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

export default model('Certificate', certificateSchema)
