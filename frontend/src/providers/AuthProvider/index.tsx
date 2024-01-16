import React, { useState, createContext, useContext } from "react";
import { AuthProviderProps, AuthContextType, UserData } from "../../model";
import { UserTypes } from "../../model";
import API from "../../api";
import {
  LoginUserRequestDTO,
  RegisterUserDTO,
} from "../../../../backend/models/types/user";

export const AuthContext = createContext<AuthContextType>(null!);

const defaultUserData: UserData = {
  userName: "",
  userType: UserTypes.GUEST,
  userProfile: {
    studentId: "",
    yearOfStudy: 1,
    gpa: 0,
    generalInformation: {
      firstName: "",
      lastName: "",
      department: "",
      phoneNumber: "",
      profilePicture: "",
    },
    personalInformation: {
      fathersName: "",
      mothersName: "",
      dateOfBirth: "",
      maritalStatus: "",
      placeOfBirth: "",
      idNumber: "",
      issuingAuthority: "",
      dateOfPublish: "",
      socialSecurityNumber: "",
    },
    communicationDetails: {
      address: "",
      city: "",
      telephone: "",
      postalCode: "",
      temporaryAddress: "",
      temporaryCity: "",
      temporaryTelephone: "",
      temporaryPostalCode: "",
    },
  },
  myCourses: [],
  authToken: "",
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState(defaultUserData);

  const login = (loginForm: LoginUserRequestDTO) => {
    API.login(loginForm).then((userData) => {
      setUserData(userData);
    });
  };

  const register = (registerForm: RegisterUserDTO) => {
    API.register(registerForm)
      .then((userData) => setUserData(userData))
      .catch((err) => {
        throw err;
      });
  };

  const logout = () => {
    setUserData(defaultUserData);
  };

  return (
    <AuthContext.Provider value={{ userData, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
