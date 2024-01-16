import React, { ReactNode } from "react";
import { Route, RouteProps } from "react-router-dom";
import { UserProfile } from "../../backend/models/types/userProfile";
import {
  LoginUserRequestDTO,
  RegisterUserDTO,
} from "../../backend/models/types/user";
import {UserHistoryDTO} from "../../backend/models/types/userHistory";

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
  size?: "medium" | "small";
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

interface Accordion {
  title: string;
  rows: Array<{ col1: string; col2: string }>;
}

export interface AccordionsProps {
  sections: Array<Accordion>;
  children: Array<ReactNode>;
}

export interface Column {
  key: string;
  label: string;
  searchInputType: string;
  options: Array<string>;
}

export interface CoursesRow {
  courseId: string;
  courseName: string;
  semester: number;
  category: string;
  actions?: Array<{
    component: React.FC<ActionButtonProps | CheckBoxProps | any>;
    props: ActionButtonProps | CheckBoxProps;
  }>;
}

export interface CoursesRowStudent extends CoursesRow {
  professor: string;
  ects: number;
}

export interface CoursesRowProfessor extends CoursesRow {
  gradeBookExists: "Ναι" | "Όχι" | string;
}

export interface TableProps {}

export interface SimpleTableProps extends TableProps {
  titleRows: any;
  valueRows: any;
}

export interface HistoryTableProps extends TableProps {
  totalResults: number;
  rows: Array<UserHistoryDTO>;
  onPageChange?: (page: number, pageSize: number) => void;
}

export interface SearchTableProps extends TableProps {
  rows: Array<CoursesRowStudent | CoursesRowProfessor | any>;
  setRows: (arg: any) => void;
  columns: Array<Column>;
}

export interface ActionButtonProps {
  type: "view" | "add" | "edit" | "delete" | string;
  onClick: () => void;
  tooltip?: string;
}

export interface CheckBoxProps {
  tooltip?: string;
}

export interface GradesRow {
  courseId: string;
  courseName: string;
  semester: number;
  professor: string;
  ects: number;
  grade: number;
}

export enum UserTypes {
  GUEST = "guest",
  STUDENT = "student",
  TEACHER = "teacher",
}

export interface UserData {
  userName: string;
  userType: string;
  userProfile: UserProfile;
  myCourses?: string[];
  authToken?: string;
}

export interface RegisterForm {
  userName: string;
  password: string;
  confirmPassword: string;
  userType: string;
  firstName: string;
  lastName: string;
  department: string;
  phoneNumber: string;
  profilePicture: string;
  fathersName: string;
  mothersName: string;
  dateOfBirth: string;
  maritalStatus: string;
  placeOfBirth: string;
  idNumber: string;
  issuingAuthority: string;
  dateOfPublish: string;
  socialSecurityNumber: string;
  address: string;
  city: string;
  telephone: string;
  postalCode: string;
  temporaryAddress: string;
  temporaryCity: string;
  temporaryTelephone: string;
  temporaryPostalCode: string;
  myCourses: string[];
}
