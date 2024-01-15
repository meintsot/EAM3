import { type Course, type CourseDTO, type CourseDetailsDTO } from '../models/types/course'

class CourseTransformer {
  static toCoursesDTO (courses: Course[]): CourseDTO[] {
    return courses.map(course => this.toCourseDTO(course))
  }

  static toCourseDTO (course: Course): CourseDTO {
    return {
      courseId: course.courseId,
      courseName: course.courseName,
      semester: course.semester,
      category: course.category,
      teacher: course.teacherName,
      ects: course.ects
    }
  }

  static toCourseDetailsDTO (course: Course): CourseDetailsDTO {
    return {
      generalInformation: {
        courseId: course.courseId,
        courseName: course.courseName,
        semester: course.semester,
        category: course.category,
        fieldOfStudies: course.fieldOfStudies,
        ects: course.ects,
        teachingHours: course.teachingHours
      },
      majors: course.majors,
      relevantCourses: course.relevantCourses,
      description: course.description,
      additionalInformation: course.additionalInformation
    }
  }
}

export default CourseTransformer
