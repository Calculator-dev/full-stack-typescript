import React from "react";

export interface IAuthContainerProps {
  header: any;
  children: React.ReactNode;
}

const AuthContainer: React.FC<IAuthContainerProps> = ({children, header}) => {

  return (
    <div>
      <div>{header}</div>
      <div>{children}</div>
    </div>
  );
};

export default AuthContainer;
