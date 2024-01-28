import { type NextFunction, type Response } from 'express'
import { type AuthenticatedRequestWithQueryParams, type AuthenticatedRequest } from '../middleware/middleware'
import {
  type RetrieveGradingSystemRequest,
  type SubmitGradingSystemRequest
} from '../models/types/gradingSystem'
import GradingSystemService from '../services/gradingSystemService'
import GradingSystemTransformer from '../transformers/gradingSystemTransformer'

class GradingSystemController {
  static async retrieveGradingSystems (req: AuthenticatedRequestWithQueryParams<RetrieveGradingSystemRequest>, res: Response, next: NextFunction) {
    try {
      const request = req.queryParams!
      const gradingSystems = await GradingSystemService.retrieveGradingSystems(request, req.user!)
      const total = await GradingSystemService.countGradingSystems(request, req.user!)
      res.status(200).json(GradingSystemTransformer.toRetrieveGradingSystemResponse(gradingSystems, total))
    } catch (err) {
      next(err)
    }
  }

  static async retrieveGradingSystem (req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const gradingSystemId = req.params.gradingSystemId
      const gradingSystem = await GradingSystemService.retrieveGradingSystemDetails(gradingSystemId, req.user!)
      res.status(200).json(GradingSystemTransformer.toGradingSystemDetailsDTO(gradingSystem))
    } catch (err) {
      next(err)
    }
  }

  static async submitGradingSystemRequest (req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const request = req.body as SubmitGradingSystemRequest
      const gradingSystem = await GradingSystemService.submitGradingSystemRequest(request, req.user!)
      res.status(201).json(GradingSystemTransformer.toGradingSystemDetailsDTO(gradingSystem))
    } catch (err) {
      next(err)
    }
  }

  static async confirmGradingSystem (req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const gradingSystemId = req.params.gradingSystemId
      const request = req.body as SubmitGradingSystemRequest
      const user = req.user!
      const gradingSystem = await GradingSystemService.confirmGradingSystem(gradingSystemId, request, user)
      res.status(201).json(GradingSystemTransformer.toGradingSystemDetailsDTO(gradingSystem))
    } catch (err) {
      next(err)
    }
  }
}

export default GradingSystemController
