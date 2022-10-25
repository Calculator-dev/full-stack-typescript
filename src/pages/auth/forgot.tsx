import React, { useState } from "react";
import ErrorText from "../../components/ErrorText";
import { auth } from "../../config/firebase";
import IPagePorps from "../../interfaces/page";

const ForgotPasswordPage: React.FC<IPagePorps> = (props) => {
  const [sending, setSending] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const resetPasswordRequest = () => {
    if (error !== "") setError("");

    setSending(true);

    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log("Email sent.");
        setSent(true);
        setSending(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setSending(false);
      });
  };

  return (
    <div>
      <h1>Sent Password Reset</h1>
      {sent ? (
        <p>A link has been sent to your email with instrucion.</p>
      ) : (
        <>
          <p>Please enter your email.</p>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <button
            disabled={sending}
            color="green"
            onClick={() => resetPasswordRequest()}
          >
            Send Reset Link
          </button>
          <ErrorText error={error} />
        </>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
