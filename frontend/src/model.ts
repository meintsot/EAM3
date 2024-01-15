import React, { ReactNode } from "react";
import { Route, RouteProps } from "react-router-dom";
import {UserProfile} from "../../backend/models/types/userProfile";
import {LoginUserRequestDTO, RegisterUserDTO} from "../../backend/models/types/user";

export interface Route {
  name: string;
  pathname: string;
}

export interface SidebarProps {
  sidebarItems: Array<Route>;
}

export interface InputProps {
  id: string;
  placeholder?: string;
  error?: boolean;
  errorText?: string;
  required?: boolean;
  onChange: (arg0: string, arg1: any) => void;
}

export interface BasicInputProps extends InputProps {}

export interface PasswordInputProps extends InputProps {}

export interface DropdownInputProps extends InputProps {
  items: Array<string>;
}

export interface DateInputProps extends InputProps {}

export interface AutocompleteInputProps extends DropdownInputProps {}
export interface MultipleAutocompleteInputProps extends DropdownInputProps {}

export interface ImageUploaderProps extends InputProps {}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextType {
  userData: UserData;
  login: (loginForm: LoginUserRequestDTO) => void;
  register: (registerForm: RegisterUserDTO) => void;
  logout: () => void;
}

export type ProtectedRouteProps = RouteProps & {
  component: React.ComponentType;
  componentProps?: any;
};

export enum UserTypes {
  GUEST = "guest",
  STUDENT = "student",
  TEACHER = "teacher",
}

export interface UserData {
  userName: string
  userType: string
  userProfile: UserProfile
  myCourses?: string[]
  authToken?: string
}

export interface RegisterForm {
  userName: string
  password: string
  confirmPassword: string
  userType: string
  firstName: string
  lastName: string
  department: string
  phoneNumber: string
  profilePicture: string
  fathersName: string
  mothersName: string
  dateOfBirth: string
  maritalStatus: string
  placeOfBirth: string
  idNumber: string
  issuingAuthority: string
  dateOfPublish: string
  socialSecurityNumber: string
  address: string
  city: string
  telephone: string
  postalCode: string
  temporaryAddress: string
  temporaryCity: string
  temporaryTelephone: string
  temporaryPostalCode: string
  myCourses: string[]
}
