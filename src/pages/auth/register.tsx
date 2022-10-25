import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ErrorText from "../../components/ErrorText";
import { auth } from "../../config/firebase";
import IPagePorps from "../../interfaces/page";

const RegisterPage: React.FC<IPagePorps> = (props) => {
  const [registering, setRegistering] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const signUpWithEmailAndPassword = () => {
    if (password !== confirm)
      setError("Please make sure your passwords match.");

    if (error !== "") setError("");

    setRegistering(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);

        if (error.code.includes("auth/weak-password")) {
          setError("Please enter a stronger password.");
        } else if (error.code.includes("auth/email-already-in-use")) {
          setError("Email already in use");
        } else {
          setError("Unable to register. Please try again later");
        }
        setRegistering(false);
      });
  };

  return (
    <div>
      <h1>Register</h1>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
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
        type="confirm"
        name="confirm"
        id="confirm"
        placeholder="Confirm Password"
        onChange={(e) => setConfirm(e.target.value)}
        value={confirm}
      />
      <button
      disabled={registering}
      color="green"
      onClick={() => signUpWithEmailAndPassword()}
      >
        Sign Up
      </button>
      <p>Already have an account ? <Link to="/login">Login</Link></p>
      <ErrorText error={error} />
    </div>
  );
};

export default RegisterPage;
