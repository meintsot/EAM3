import React, { ReactNode } from "react";
import { Route, RouteProps } from "react-router-dom";
import { UserProfile } from "../../backend/models/types/userProfile";
import {
  LoginUserRequestDTO,
  RegisterUserDTO,
} from "../../backend/models/types/user";
import { UserHistoryDTO } from "../../backend/models/types/userHistory";
import { AlertColor } from "@mui/material";
import {CoursesForDeclaration} from "../../backend/models/types/declaration";
import {SubmitCertificateRequest} from "../../backend/models/types/certificate";

export interface Route {
  label: string;
  pathname: string;
}

export interface SidebarProps {
  sidebarItems: Array<Route>;
}

export interface InputProps {
  id: string;
  placeholder?: string;
  defaultValue?: string;
  error?: boolean;
  errorText?: string;
  required?: boolean;
  size?: "medium" | "small";
  onChange: (arg0: string, arg1: any) => void;
}

export interface BasicInputProps extends InputProps {
  disabled?: boolean;
}

export interface PasswordInputProps extends InputProps {}

export interface DropdownInputProps extends InputProps {
  items: Array<string>;
}

export interface DateInputProps extends InputProps {}

export interface AutocompleteInputProps extends DropdownInputProps {}
export interface MultipleAutocompleteInputProps extends DropdownInputProps {
  defaultValues?: string[];
}

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
  rolesAllowed: Array<string>;
};

interface Accordion {
  title: string;
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

export interface CoursesResults {
  courses: CoursesRow[]
  total: number
}

export interface CoursesRow {
  courseId: string;
  courseName: string;
  semester: number;
  category: string;
  professor?: string;
  ects?: number;
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

export interface Filters {
  [key: string]: any;
}

export interface SearchTableProps extends TableProps {
  rows: Array<CoursesRow | any>;
  columns: Array<Column>;
  actions: Array<string>;
  totalResults: number
  onCheckedCourses?: React.Dispatch<React.SetStateAction<CoursesForDeclaration[]>>;
  onFilterChange?: React.Dispatch<React.SetStateAction<Filters>>;
}

export interface StepperFormProps {
  onSubmit: React.Dispatch<SubmitCertificateRequest>;
}

export interface ActionButtonProps {
  type: "view" | "add" | "edit" | "delete" | string;
  onClick: () => void;
  tooltip?: string;
}

export interface CheckBoxProps {
  tooltip?: string;
  onChange: (arg: any) => void;
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

export interface AlertPopUpEventDetails {
  alertTitle: string;
  alertMessage: string;
  alertType: AlertColor | undefined;
  alertTimeout: number;
}

export interface AlertPopUpEvent extends Event {
  detail: AlertPopUpEventDetails;
}

export interface ConfirmationModalProps {
  text: string;
  open: boolean;
  onOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
}

export interface SliderListModalProps {
  courses: Array<CoursesRow>;
  onClick: (arg: string) => void;
  open: boolean;
  onOpen: (arg: boolean) => void;
}
