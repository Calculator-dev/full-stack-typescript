import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ErrorText from "../../components/ErrorText";
import { auth, Providers } from "../../config/firebase";
import IPagePorps from "../../interfaces/page";
import firebase from "firebase/compat";
import { SignInWithSocialMedia } from "./modules";

const LoginPage: React.FC<IPagePorps> = (props) => {
  const [authenticating, setAuthenticating] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();


  const signInWithEmailAndPassword = () => {
    if (error !== "") setError("");

    setAuthenticating(true);

    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setAuthenticating(false);
        setError(error.message);
      });
  };

  const singInWithSocialMedia = (provider: firebase.auth.AuthProvider) => {
    if (error !== "") setError("");

    setAuthenticating(true);

    SignInWithSocialMedia(provider)
    .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setAuthenticating(false);
        setError(error.message);
      });   
  }

  return (
    <div>
      <h1>Login</h1>
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
      <button
        disabled={authenticating}
        color="green"
        onClick={() => signInWithEmailAndPassword()}
      >
        Sign In
      </button>
      <p>
        Don't have an account ? <Link to="/register">Register here.</Link>
      </p>
      <p>
        Don't have an account ? <Link to="/forgot">Forgot password</Link>
      </p>
      <ErrorText error={error} />
      <hr />
      <button
      disabled={authenticating}
      onClick={() => singInWithSocialMedia(Providers.google)}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default LoginPage;
