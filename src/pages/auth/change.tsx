import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ErrorText from "../../components/ErrorText";
import { auth } from "../../config/firebase";
import IPagePorps from "../../interfaces/page";

const ChangePage: React.FC<IPagePorps> = (props) => {
  const [changing, setChanging] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [old, setOld] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const passwordChangeRequest = () => {
    if (password !== confirm) setError("Passwords doesn't match");

    if (error !== "") setError("");

    setChanging(true);

    auth.currentUser
      ?.updatePassword(password)
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setChanging(false);
        setError(error.message);
      });
  };

  if (auth.currentUser?.providerData[0]?.providerId !== "password")
    navigate("/");

  return (
    <div>
      <h1>Change Password</h1>
      <input
        autoComplete="new-password"
        type="password"
        name="oldPassword"
        id="oldPassword"
        placeholder="Old Password"
        onChange={(e) => setOld(e.target.value)}
        value={old}
      />
      <input
        autoComplete="new-password"
        type="password"
        name="password"
        id="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <input
        autoComplete="new-password"
        type="password"
        name="confirm"
        id="confirm"
        placeholder="Confirm Password"
        onChange={(e) => setConfirm(e.target.value)}
        value={confirm}
      />
      <button
        disabled={changing}
        color="green"
        onClick={() => passwordChangeRequest()}
      >
        Change Password
      </button>
      <p>
        Don't have an account ? <Link to="/register">Register here.</Link>
      </p>
      <ErrorText error={error} />
    </div>
  );
};

export default ChangePage;
