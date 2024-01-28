import React, {useState, createContext, useContext, useEffect} from "react";
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

  useEffect(() => {
    const authToken = localStorage.getItem('JWT');
    if (authToken) {
        API.autoLogin(authToken).then((userData) => {
          console.log('autologin', userData);
          setUserData(userData);
        }).catch(err => console.log(err))
    }
  }, []);

  const login = async (loginForm: LoginUserRequestDTO) => {
    try {
      const userData = await API.login(loginForm);
      localStorage.setItem('JWT', userData.authToken!);
      setUserData(userData);
    } catch (err) {
      console.log(err)
    }
  };

  const register = async (registerForm: RegisterUserDTO) => {
    try {
      const userData = await API.register(registerForm);
      localStorage.setItem('JWT', userData.authToken!);
      setUserData(userData);
    } catch (err) {
      console.log(err)
    }
  };

  const logout = () => {
    localStorage.removeItem('JWT');
    setUserData(defaultUserData);
  };

  return (
    <AuthContext.Provider value={{ userData, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
