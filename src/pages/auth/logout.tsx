import React from "react";
import IPagePorps from "../../interfaces/page";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";

const LogoutPage: React.FC<IPagePorps> = () => {
  const navigate = useNavigate();

  const logout = () => {
    auth.signOut()
    .then(() => navigate("/login"))
    .catch(error => console.log(error))
  }

  return (
    <div>
      <p>Are you sure you want to logout?</p>
      <div>
        <button onClick={() => navigate(-1)}>Cancel</button>
        <button onClick={() => logout() } >Logout</button>
      </div>
    </div>
  );
};

export default LogoutPage;
