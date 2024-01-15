import { Schema } from 'mongoose'
import { type UserProfile } from './types/userProfile'

const userProfileSchema = new Schema<UserProfile>({
  studentId: { type: String, required: true },
  yearOfStudy: { type: Number, required: true },
  gpa: Number,
  generalInformation: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    department: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    profilePicture: { type: String, required: true }
  },
  personalInformation: {
    fathersName: { type: String, required: true },
    mothersName: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    maritalStatus: { type: String, required: true },
    placeOfBirth: { type: String, required: true },
    idNumber: { type: String, required: true },
    issuingAuthority: { type: String, required: true },
    dateOfPublish: { type: String, required: true },
    socialSecurityNumber: { type: String, required: true }
  },
  communicationDetails: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    telephone: { type: String, required: true },
    postalCode: { type: String, required: true },
    temporaryAddress: { type: String, required: true },
    temporaryCity: { type: String, required: true },
    temporaryTelephone: { type: String, required: true },
    temporaryPostalCode: { type: String, required: true }
  }
})

export default userProfileSchema
