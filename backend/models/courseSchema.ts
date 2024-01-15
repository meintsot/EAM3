import mongoose, { Schema, model } from 'mongoose'
import { type Course } from './types/course'

const courseSchema: mongoose.Schema<Course> = new mongoose.Schema({
  courseId: {
    type: String,
    required: true
  },
  courseName: {
    type: String,
    required: true
  },
  semester: [
    {
      type: Number,
      required: true
    }
  ],
  category: {
    type: String,
    required: true
  },
  fieldOfStudies: {
    type: String,
    required: true
  },
  ects: {
    type: Number,
    required: true
  },
  teachingHours: {
    theory: {
      type: Number,
      required: true
    },
    tutoring: {
      type: Number,
      required: false
    },
    lab: {
      type: Number,
      required: false
    }
  },
  majors: [
    {
      majorType: {
        type: String,
        required: true
      },
      cardinality: {
        type: String,
        required: true
      }
    }
  ],
  relevantCourses: {
    mandatory: [
      {
        type: String,
        required: true
      }
    ],
    optional: [
      {
        type: String,
        required: true
      }
    ]
  },
  teacherName: {
    type: String,
    required: false
  },
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  description: {
    type: String,
    required: true
  },
  additionalInformation: {
    links: [
      {
        name: {
          type: String,
          required: true
        },
        url: {
          type: String,
          required: true
        }
      }
    ],
    bibliography: [
      {
        type: String,
        required: true
      }
    ]
  }
})

export default model('Course', courseSchema)
