import {
  type Declaration,
  DeclarationDetailsDTO,
  type RetrieveDeclarationsRequest,
  type SubmitDeclarationRequest
} from '../models/types/declaration'
import DeclarationRepository from '../repositories/declarationReporitory'
import { type User } from '../models/types/user'
import HistoryRepository from '../repositories/historyRepository'
import { HistoryActions } from '../models/historyActions'

class DeclarationService {
  static async retrieveDeclarations (request: RetrieveDeclarationsRequest, user: User): Promise<Declaration[]> {
    return await DeclarationRepository.findByCriteria({ ...request, studentId: user._id }, request as PaginationRequest)
  }

  static async countDeclarations ({ page, pageSize, ...criteria }: RetrieveDeclarationsRequest, user: User): Promise<number> {
    return await DeclarationRepository.countByCriteria({ ...criteria, studentId: user._id })
  }

  static async retrieveDeclarationDetails (declarationId: string, user: User): Promise<Declaration> {
    return await DeclarationRepository.findOneByCriteria({ _id: declarationId, studentId: user._id })
  }

  static async submitDeclarationRequest (request: SubmitDeclarationRequest, user: User): Promise<Declaration> {
    const res = await DeclarationRepository.saveDeclaration({ ...request, studentId: user._id!, state: 'Προσωρινή αποθήκευση' })
    await HistoryRepository.saveHistory({ userId: user._id!, action: HistoryActions.SUBMIT_DECLARATION, date: new Date() })
    return res
  }

  static async confirmDeclaration (declarationId: string, declaration: DeclarationDetailsDTO, user: User): Promise<Declaration> {
    declaration.state = 'Οριστική υποβολή'
    const res = await DeclarationRepository.updateDeclaration(declarationId, declaration)
    await HistoryRepository.saveHistory({ userId: user._id!, action: HistoryActions.CONFIRM_DECLARATION, date: new Date() })
    return res
  }
}

export default DeclarationService
