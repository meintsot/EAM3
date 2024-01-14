import React, { ReactNode } from "react";
import { Route, RouteProps } from "react-router-dom";

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
  userType: string;
  login: () => void;
  register: () => void;
  logout: () => void;
}

export type ProtectedRouteProps = RouteProps & {
  component: React.ComponentType;
  componentProps?: any;
};
