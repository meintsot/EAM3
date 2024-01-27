import { type Response } from 'express'
import { type AuthenticatedRequestWithQueryParams, type AuthenticatedRequest } from '../middleware/middleware'
import { type RetrieveCertificatesRequest, type SubmitCertificateRequest } from '../models/types/certificate'
import CertificateService from '../services/certificateService'
import CertificateTransformer from '../transformers/certificateTransformer'

class CertificateController {
  static async retrieveCertificates (req: AuthenticatedRequestWithQueryParams<RetrieveCertificatesRequest>, res: Response) {
    const request = req.queryParams!
    const certificates = await CertificateService.retrieveCertificates(request, req.user!)
    const total = await CertificateService.countCertificates(request, req.user!)
    res.status(200).json(CertificateTransformer.toRetrieveCertificatesResponse(certificates, total))
  }

  static async retrieveCertificate (req: AuthenticatedRequest, res: Response) {
    const certificateId = req.params.certificateId
    const certificate = await CertificateService.retrieveCertificateDetails(certificateId, req.user!)
    res.status(200).json(CertificateTransformer.toCertificateDetailsDTO(certificate))
  }

  static async submitCertificateRequest (req: AuthenticatedRequest, res: Response) {
    const request = req.body as SubmitCertificateRequest
    const certificate = await CertificateService.submitCertificateRequest(request, req.user!)
    res.status(201).json(CertificateTransformer.toCertificateDetailsDTO(certificate))
  }

  static async confirmCertificate (req: AuthenticatedRequest, res: Response) {
    const certificateId = req.params.certificateId
    const user = req.user!
    const certificate = await CertificateService.confirmCertificate(certificateId, user)
    res.status(201).json(CertificateTransformer.toCertificateDetailsDTO(certificate))
  }
}

export default CertificateController
