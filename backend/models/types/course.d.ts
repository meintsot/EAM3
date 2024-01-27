import type mongoose from 'body-parsermongoose'

interface TeachingHours {
  theory: number
  tutoring?: number
  lab?: number
}

interface Major {
  majorType: string
  cardinality: string
}

interface RelevantCourses {
  mandatory: string[]
  optional: string[]
}
interface CourseLink {
  name: string
  url: string
}

interface AdditionalInformationCourse {
  links: CourseLink[]
  bibliography: string[]
}

interface Course {
  _id?: mongoose.ObjectId | string
  courseId: string
  courseName: string
  semester: number[]
  category: string
  fieldOfStudies: string
  ects: number
  teachingHours: TeachingHours
  majors: Major[]
  relevantCourses: RelevantCourses
  teacherName?: string
  teacherId?: string
  description: string
  additionalInformation: AdditionalInformationCourse
}

interface CourseGeneralInformation {
  courseId: string
  courseName: string
  semester: number[]
  category: string
  fieldOfStudies: string
  ects: number
  teachingHours: TeachingHours
}

interface CourseDTO {
  courseId: string
  courseName: string
  semester: number[]
  category: string
  teacher?: string
  ects: number
}

interface CourseDetailsDTO {
  generalInformation: CourseGeneralInformation
  majors: Major[]
  relevantCourses: RelevantCourses
  description: string
  additionalInformation: AdditionalInformationCourse
}

interface RetrieveCoursesRequest extends PaginationRequest {
  courseId?: string
  courseName?: string
  semester?: number[]
  category?: string
  teacher?: string
  ects?: number
}

interface RetrieveCoursesResponse {
  courses: CourseDTO[]
  total: number
}

type RetrieveMyCoursesRequest = Omit<RetrieveCoursesRequest, 'teacher'>
