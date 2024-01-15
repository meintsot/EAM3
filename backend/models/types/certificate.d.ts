import type mongoose from 'mongoose'

type certificateType = 'Φοιτητικής Ιδιότητας' | 'Φορολογικής Χρήσης' | 'Αναλυτική βαθμολογία με προβιβάσιμους βαθμούς'
| 'Στρατολογική Χρήση (Συνοπτικό)' | 'Στρατολογική Χρήση (Aναλυτικό)'

interface Certificate {
  _id?: mongoose.ObjectId | string
  type: certificateType
  state: string
  dateRequested: string
  dateRegistered: string
  studentId: mongoose.ObjectId | string
}

type CertificateDTO = Omit<Certificate, 'studentId'>

type CertificateDetailsDTO = Omit<Certificate, 'studentId'>

type SubmitCertificateRequest = Omit<Certificate, '_id' | 'studentId'>

interface RetrieveCertificatesRequest extends PaginationRequest {
  type?: string
  state?: string
  dateRequested?: string
  dateRegistered?: string
}
