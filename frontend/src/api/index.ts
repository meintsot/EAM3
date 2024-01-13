import axios from "axios";

export const register = ({
  userName,
  password,
  confirmPassword,
  userType,
  firstName,
  lastName,
  department,
  phoneNumber,
  profilePicture,
  fathersName,
  mothersName,
  dateOfBirth,
  maritalStatus,
  placeOfBirth,
  idNumber,
  issuingAuthority,
  dateOfPublish,
  socialSecurityNumber,
  address,
  city,
  telephone,
  postalCode,
  temporaryAddress,
  temporaryCity,
  temporaryTelephone,
  temporaryPostalCode,
  myCourses,
}: any) => {
  axios
    .post("/api/auth/register", {
      userName,
      password,
      confirmPassword,
      userType,
      userProfile: {
        generalInformation: {
          firstName,
          lastName,
          department,
          phoneNumber,
          profilePicture,
        },
        personalInformation: {
          fathersName,
          mothersName,
          dateOfBirth,
          maritalStatus,
          placeOfBirth,
          idNumber,
          issuingAuthority,
          dateOfPublish,
          socialSecurityNumber,
        },
        communicationDetals: {
          address,
          city,
          telephone,
          postalCode,
          temporaryAddress,
          temporaryCity,
          temporaryTelephone,
          temporaryPostalCode,
        },
      },
      myCourses,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
