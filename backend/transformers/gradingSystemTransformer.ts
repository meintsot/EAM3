import {
  type GradingSystem,
  type GradingSystemDetailsDTO,
  type GradingSystemDTO,
  RetrieveGradingSystemRequest, type RetrieveGradingSystemResponse
} from '../models/types/gradingSystem'

class GradingSystemTransformer {
  static toGradingSystemsDTO (gradingSystems: GradingSystem[]): GradingSystemDTO[] {
    return gradingSystems.map(gradingSystem => this.toGradingSystemDTO(gradingSystem))
  }

  static toGradingSystemDTO (gradingSystem: GradingSystem): GradingSystemDTO {
    return {
      _id: gradingSystem._id as string,
      examPeriod: gradingSystem.examPeriod,
      state: gradingSystem.state,
      courseName: gradingSystem.courseName,
      courseId: gradingSystem.courseId
    }
  }

  static toRetrieveGradingSystemResponse (gradingSystems: GradingSystem[], total: number): RetrieveGradingSystemResponse {
    return {
      gradingSystems: this.toGradingSystemsDTO(gradingSystems),
      total
    }
  }

  static toGradingSystemDetailsDTO (gradingSystem: GradingSystem): GradingSystemDetailsDTO {
    return {
      _id: gradingSystem._id as string,
      examPeriod: gradingSystem.examPeriod,
      state: gradingSystem.state,
      courseName: gradingSystem.courseName,
      courseId: gradingSystem.courseId,
      students: gradingSystem.students
    }
  }
}

export default GradingSystemTransformer
