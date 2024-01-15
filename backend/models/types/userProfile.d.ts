import mongoose from 'mongoose'

interface UserProfile {
  studentId: string
  yearOfStudy: number
  gpa?: number
  generalInformation: GeneralInformation
  personalInformation: PersonalInformation
  communicationDetails: CommunicationDetails
}

interface GeneralInformation {
  firstName: string
  lastName: string
  department: string
  phoneNumber: string
  profilePicture: string
}

interface PersonalInformation {
  fathersName: string
  mothersName: string
  dateOfBirth: string
  maritalStatus?: string
  placeOfBirth: string
  idNumber: string
  issuingAuthority?: string
  dateOfPublish: string
  socialSecurityNumber: string
}

interface CommunicationDetails {
  address: string
  city: string
  telephone?: string
  postalCode: string
  temporaryAddress?: string
  temporaryCity?: string
  temporaryTelephone?: string
  temporaryPostalCode?: string
}

interface UserProfileDTO {
  generalInformation: GeneralInformation
  personalInformation: PersonalInformation
  communicationDetails: CommunicationDetails
}
