import {
  type Certificate,
  type CertificateDetailsDTO,
  type CertificateDTO,
  type RetrieveCertificatesResponse
} from '../models/types/certificate'

class CertificateTransformer {
  static toCertificatesDTO (certificates: Certificate[]): CertificateDTO[] {
    return certificates.map(certificate => this.toCertificateDTO(certificate))
  }

  static toCertificateDTO (certificate: Certificate): CertificateDTO {
    return {
      _id: certificate._id as string,
      type: certificate.type,
      state: certificate.state,
      dateRequested: certificate.dateRequested,
      dateRegistered: certificate.dateRegistered
    }
  }

  static toCertificateDetailsDTO (certificate: Certificate): CertificateDetailsDTO {
    return {
      _id: certificate._id as string,
      type: certificate.type,
      state: certificate.state,
      dateRequested: certificate.dateRequested,
      dateRegistered: certificate.dateRegistered,
      numberOfReplicas: certificate.numberOfReplicas
    }
  }

  static toRetrieveCertificatesResponse (certificates: Certificate[], total: number): RetrieveCertificatesResponse {
    return {
      certificates: this.toCertificatesDTO(certificates),
      total
    }
  }
}

export default CertificateTransformer
