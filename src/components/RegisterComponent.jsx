
import React, { useState, useContext } from "react";
import { Navigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { createUser } from "../firebase/authFunctions";

const RegisterComponent = () => {
  const { userLoggedIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    if (!isRegistering) {
      setIsRegistering(true);
      try {
        await createUser(email, password);
      } catch (error) {
        setErrorMessage(error.message);
        setIsRegistering(false);
      }
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to="/" replace={true} />}

      <main className="login-main">
        <div className="login-container">
          <div className="login-title">
            <h3 className="login-heading">Create a new account</h3>
          </div>
          <form onSubmit={onSubmit} className="login-form">
            <div className="login-input-group">
              <label>Email</label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className="login-input-group">
              <label>Password</label>
              <input
                disabled={isRegistering}
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <div className="login-input-group">
              <label>Confirm Password</label>
              <input
                disabled={isRegistering}
                type="password"
                autoComplete="off"
                required
                value={confirmPassword}
                onChange={(e) => {
                  setconfirmPassword(e.target.value);
                }}
              />
            </div>

            {errorMessage && (
              <span className="login-error">{errorMessage}</span>
            )}

            <button
              type="submit"
              disabled={isRegistering}
              className={`login-button ${
                isRegistering ? "disabled" : ""
              }`}
            >
              {isRegistering ? "Signing Up..." : "Sign Up"}
            </button>
            <div className="login-signup">
              Already have an account? {" "}
              <Link to="/login" className="login-signup-link">
                Continue
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default RegisterComponent;
