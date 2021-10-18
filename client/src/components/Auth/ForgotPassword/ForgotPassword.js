import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

import { forgotPasswordAPI } from "../../../api/userAuth";

import useToast from "../../../customHooks/useToast/useToast";
import "react-toastify/dist/ReactToastify.css";


function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [toast, ToastContainer] = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPasswordAPI(email);
      toast.success("Mail to reset password is sent on given email address. Make sure to check spam folder.");
    } catch (err) {
      if (err?.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Internal server error. Please try again.");
      }
    }
  };

  return (
    <>
      <div id="forgot-container">
        <div id="forgot-card">
          <h1 className="text-center">Forgot Password</h1>
          <p className="text-center">A link to reset your password will be sent to your email address.</p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Link to="/login">Back to login?</Link>
            <button type="submit">Send Mail</button>
          </form>
        </div>
      </div>
      {ToastContainer}
    </>
  );
}

export default ForgotPassword;
