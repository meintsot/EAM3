import { type FilterQuery, type UpdateQuery } from 'mongoose'
import { type Certificate } from '../models/types/certificate'

import CertificateModel from '../models/certificateSchema'
import BackendError from '../fault/backendError'
import ReasonType from '../fault/types/reason-type.enum'

class CertificateRepository {
  static async findByCriteria (criteria: FilterQuery<Certificate>, paginationRequest: PaginationRequest): Promise<Certificate[]> {
    const adjustedCriteria: FilterQuery<Certificate> = {}
    for (const key in criteria) {
      if (Object.prototype.hasOwnProperty.call(criteria, key)) {
        const value = criteria[key]
        if (key === 'pageSize' || key === 'page') {
          continue
        }
        if (typeof value === 'string') {
          // Use a regular expression for partial matching
          adjustedCriteria[key] = new RegExp(value, 'i')
        } else {
          // For non-string fields, use the original criteria
          adjustedCriteria[key] = value
        }
      }
    }

    const skip = (paginationRequest.page - 1) * paginationRequest.pageSize
    return await CertificateModel.find(adjustedCriteria).skip(skip).limit(paginationRequest.pageSize)
  }

  static async countByCriteria (criteria: FilterQuery<Certificate>): Promise<number> {
    const adjustedCriteria: FilterQuery<Certificate> = {}
    for (const key in criteria) {
      if (Object.prototype.hasOwnProperty.call(criteria, key)) {
        const value = criteria[key]
        if (key === 'pageSize' || key === 'page') {
          continue
        }
        if (typeof value === 'string') {
          // Use a regular expression for partial matching
          adjustedCriteria[key] = new RegExp(value, 'i')
        } else {
          // For non-string fields, use the original criteria
          adjustedCriteria[key] = value
        }
      }
    }

    return await CertificateModel.countDocuments(adjustedCriteria).exec()
  }

  static async findOneByCriteria (criteria: FilterQuery<Certificate>): Promise<Certificate> {
    const certificate = await CertificateModel.findOne(criteria).lean()
    if (certificate == null) {
      throw new BackendError(ReasonType.CERTIFICATE_NOT_FOUND, 404)
    }
    return certificate
  }

  static async saveCertificate (certificate: Certificate): Promise<Certificate> {
    return await CertificateModel.create(certificate)
  }

  static async updateCertificate (certificateId: string, certificate: UpdateQuery<Certificate>): Promise<Certificate> {
    const newCertificate = await CertificateModel.findOneAndUpdate({ _id: certificateId }, certificate, { new: true }).lean()
    if (newCertificate == null) {
      throw new BackendError(ReasonType.CERTIFICATE_NOT_FOUND, 404)
    }
    return newCertificate
  }
}

export default CertificateRepository
