import React from "react";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

export interface IAuthRouteProps {
    children: React.ReactNode;
}

const AuthRoute: React.FC<IAuthRouteProps> = ({ children }) => {
  const navigate = useNavigate();

  if (!auth.currentUser) {
    console.log("No user detected, redirecting");
    navigate("/login");
  }

  return <div>{children}</div>;
};

export default AuthRoute;