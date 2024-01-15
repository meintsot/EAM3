import { type Response } from 'express'
import { type AuthenticatedRequestWithQueryParams, type AuthenticatedRequest } from '../middleware/middleware'
import { type RetrieveDeclarationsRequest, type SubmitDeclarationRequest } from '../models/types/declaration'
import DeclarationService from '../services/declarationService'
import DeclarationTransformer from '../transformers/declarationTransformer'

class DeclarationController {
  static async retrieveDeclarations (req: AuthenticatedRequestWithQueryParams<RetrieveDeclarationsRequest>, res: Response) {
    const request = req.queryParams!
    console.log(request)
    const declarations = await DeclarationService.retrieveDeclarations(request, req.user!)
    res.status(200).json(DeclarationTransformer.toDeclarationsDTO(declarations))
  }

  static async retrieveDeclaration (req: AuthenticatedRequest, res: Response) {
    const declarationId = req.params.declarationId
    const declaration = await DeclarationService.retrieveDeclarationDetails(declarationId, req.user!)
    res.status(200).json(DeclarationTransformer.toDeclarationDetailsDTO(declaration))
  }

  static async submitDeclarationRequest (req: AuthenticatedRequest, res: Response) {
    const request = req.body as SubmitDeclarationRequest
    const declaration = await DeclarationService.submitDeclarationRequest(request, req.user!)
    res.status(201).json(DeclarationTransformer.toDeclarationDetailsDTO(declaration))
  }

  static async confirmDeclaration (req: AuthenticatedRequest, res: Response) {
    const declarationId = req.params.declarationId
    const user = req.user!
    const declaration = await DeclarationService.confirmDeclaration(declarationId, user)
    res.status(201).json(DeclarationTransformer.toDeclarationDetailsDTO(declaration))
  }
}

export default DeclarationController
