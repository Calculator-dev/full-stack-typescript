import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import ErrorText from "../../components/ErrorText";
import { auth } from "../../config/firebase";
import IPagePorps from "../../interfaces/page";
import queryString from "query-string";

const ResetPasswordPage: React.FC<IPagePorps> = (props) => {
  const [verifying, setVerifying] = useState<boolean>(true);
  const [verified, setVerified] = useState<boolean>(true);
  const [changing, setChanging] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [oobCode, setOobCode] = useState<string>("");
  const [error, setError] = useState<string>("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Extracting code");
    let stringParams = queryString.parse(location.search);
    if (stringParams) {
      let oobCode = stringParams.oobCode as string;
      if (oobCode) {
        console.log("Code found");
        verifyPasswordResetLink(oobCode);
      } else {
        console.log("Unable to find code");
        setVerified(false);
        setVerifying(false);
      }
    } else {
      console.log("Unable to find code");
      setVerified(false);
      setVerifying(false);
    }
  }, [location.search]);

  const verifyPasswordResetLink = (_oobCode: string) => {
    auth
      .verifyPasswordResetCode(_oobCode)
      .then((result) => {
        console.log("result");
        setOobCode(_oobCode);
        setVerified(true);
        setVerifying(false);
      })
      .catch((error) => {
        console.log(error);
        setVerified(false);
        setVerifying(false);
      });
  };

  const passwordResetRequest = () => {
    if (password !== confirm) setError("Passwords doesn't match");

    if (error !== "") setError("");

    setChanging(true);

    auth
      .confirmPasswordReset(oobCode, password)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setChanging(false);
      });
  };

  return (
    <div>
      <h1>Change Password</h1>
      {verifying ? (
        <p>Loading...</p>
      ) : (
        <>
          {verified ? (
            <>
              {" "}
              <p>Please enter a strong password</p>
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
              />{" "}
              <button
                disabled={changing}
                color="green"
                onClick={() => passwordResetRequest()}
              >
                Reset Password
              </button>
            </>
          ) : (
            <p>Invalid link.</p>
          )}
        </>
      )}

      <p>
        Don't have an account ? <Link to="/register">Register here.</Link>
      </p>
      <ErrorText error={error} />
    </div>
  );
};

export default ResetPasswordPage;
