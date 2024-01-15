import { type Declaration, type DeclarationDetailsDTO, type DeclarationDTO } from '../models/types/declaration'

class DeclarationTransformer {
  static toDeclarationsDTO (declarations: Declaration[]): DeclarationDTO[] {
    return declarations.map(declaration => this.toDeclarationDTO(declaration))
  }

  static toDeclarationDTO (declaration: Declaration): DeclarationDTO {
    return {
      _id: declaration._id as string,
      examPeriod: declaration.examPeriod,
      state: declaration.state
    }
  }

  static toDeclarationDetailsDTO (declaration: Declaration): DeclarationDetailsDTO {
    return {
      _id: declaration._id as string,
      examPeriod: declaration.examPeriod,
      state: declaration.state,
      courses: declaration.courses
    }
  }
}

export default DeclarationTransformer
