import { type NextFunction, type Response } from 'express'
import { type AuthenticatedRequestWithQueryParams, type AuthenticatedRequest } from '../middleware/middleware'
import { type RetrieveDeclarationsRequest, type SubmitDeclarationRequest } from '../models/types/declaration'
import DeclarationService from '../services/declarationService'
import DeclarationTransformer from '../transformers/declarationTransformer'

class DeclarationController {
  static async retrieveDeclarations (req: AuthenticatedRequestWithQueryParams<RetrieveDeclarationsRequest>, res: Response, next: NextFunction) {
    try {
      const request = req.queryParams!
      const declarations = await DeclarationService.retrieveDeclarations(request, req.user!)
      const total = await DeclarationService.countDeclarations(request, req.user!)
      res.status(200).json(DeclarationTransformer.toRetrieveDeclarationsResponse(declarations, total))
    } catch (err) {
      next(err)
    }
  }

  static async retrieveDeclaration (req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const declarationId = req.params.declarationId
      const declaration = await DeclarationService.retrieveDeclarationDetails(declarationId, req.user!)
      res.status(200).json(DeclarationTransformer.toDeclarationDetailsDTO(declaration))
    } catch (err) {
      next(err)
    }
  }

  static async submitDeclarationRequest (req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const request = req.body as SubmitDeclarationRequest
      const declaration = await DeclarationService.submitDeclarationRequest(request, req.user!)
      res.status(201).json(DeclarationTransformer.toDeclarationDetailsDTO(declaration))
    } catch (err) {
      next(err)
    }
  }

  static async confirmDeclaration (req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const declarationId = req.params.declarationId
      const user = req.user!
      const declaration = await DeclarationService.confirmDeclaration(declarationId, user)
      res.status(201).json(DeclarationTransformer.toDeclarationDetailsDTO(declaration))
    } catch (err) {
      next(err)
    }
  }
}

export default DeclarationController
