import { type Response } from 'express'
import { type AuthenticatedRequestWithQueryParams, type AuthenticatedRequest } from '../middleware/middleware'
import {
  type RetrieveGradingSystemRequest,
  type RetrieveStudentGradesRequest,
  type SubmitGradingSystemRequest
} from '../models/types/gradingSystem'
import GradingSystemService from '../services/gradingSystemService'
import GradingSystemTransformer from '../transformers/gradingSystemTransformer'

class GradingSystemController {
  static async retrieveGradingSystems (req: AuthenticatedRequestWithQueryParams<RetrieveGradingSystemRequest>, res: Response) {
    const request = req.queryParams!
    const gradingSystems = await GradingSystemService.retrieveGradingSystems(request, req.user!)
    res.status(200).json(GradingSystemTransformer.toGradingSystemsDTO(gradingSystems))
  }

  static async retrieveGradingSystem (req: AuthenticatedRequest, res: Response) {
    const gradingSystemId = req.params.gradingSystemId
    const gradingSystem = await GradingSystemService.retrieveGradingSystemDetails(gradingSystemId, req.user!)
    res.status(200).json(GradingSystemTransformer.toGradingSystemDetailsDTO(gradingSystem))
  }

  static async submitGradingSystemRequest (req: AuthenticatedRequest, res: Response) {
    const request = req.body as SubmitGradingSystemRequest
    const gradingSystem = await GradingSystemService.submitGradingSystemRequest(request, req.user!)
    res.status(201).json(GradingSystemTransformer.toGradingSystemDetailsDTO(gradingSystem))
  }

  static async confirmGradingSystem (req: AuthenticatedRequest, res: Response) {
    const gradingSystemId = req.params.gradingSystemId
    const user = req.user!
    const gradingSystem = await GradingSystemService.confirmGradingSystem(gradingSystemId, user)
    res.status(201).json(GradingSystemTransformer.toGradingSystemDetailsDTO(gradingSystem))
  }
}

export default GradingSystemController
