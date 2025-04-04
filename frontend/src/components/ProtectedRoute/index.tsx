import React from "react";
import { useAuth } from "../../providers/AuthProvider";
import { ProtectedRouteProps } from "../../model";
import { Navigate } from "react-router-dom";

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  const { component: Component, componentProps, rolesAllowed } = props;

  const { userData } = useAuth();

  return (
    <React.Fragment>
      {rolesAllowed.includes(userData.userType) ? (
        <Component {...componentProps} />
      ) : (
        <Navigate to="/" />
      )}
    </React.Fragment>
  );
};

export default ProtectedRoute;
