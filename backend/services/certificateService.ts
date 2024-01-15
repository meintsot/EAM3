import { type Certificate, type RetrieveCertificatesRequest, type SubmitCertificateRequest } from '../models/types/certificate'
import CertificateRepository from '../repositories/certificateReporitory'
import { type User } from '../models/types/user'
import HistoryRepository from '../repositories/historyRepository'
import { HistoryActions } from '../models/historyActions'

class CertificateService {
  static async retrieveCertificates (request: RetrieveCertificatesRequest, user: User): Promise<Certificate[]> {
    return await CertificateRepository.findByCriteria({ ...request, studentId: user._id }, request as PaginationRequest)
  }

  static async retrieveCertificateDetails (certificateId: string, user: User): Promise<Certificate> {
    return await CertificateRepository.findOneByCriteria({ _id: certificateId, studentId: user._id })
  }

  static async submitCertificateRequest (request: SubmitCertificateRequest, user: User): Promise<Certificate> {
    const res = await CertificateRepository.saveCertificate({ ...request, studentId: user._id!, state: 'pending' })
    await HistoryRepository.saveHistory({ userId: user._id!, action: HistoryActions.REQUEST_CERTIFICATE, date: new Date() })
    return res
  }

  static async confirmCertificate (certificateId: string, user: User): Promise<Certificate> {
    const certificate = await CertificateRepository.findOneByCriteria({ _id: certificateId, studentId: user._id })
    certificate.state = 'confirmed'
    const res = await CertificateRepository.updateCertificate(certificateId, certificate)
    await HistoryRepository.saveHistory({ userId: user._id!, action: HistoryActions.APPROVE_CERTIFICATE, date: new Date() })
    return res
  }
}

export default CertificateService
