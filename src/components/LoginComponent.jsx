import React, { useState, useContext, useCallback } from "react";
import { Navigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { signInUser } from "../firebase/authFunctions";
import "../index.css";

const LoginComponent = () => {
  const { userLoggedIn } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { email, password } = formData;
      console.log("Submitting login form...");
      console.log("Email:", email);
      console.log("Password:", password);

      if (!isSigningIn) {
        setIsSigningIn(true);
        try {
          await signInUser(email, password);
        } catch (error) {
          setErrorMessage(error.message);
        } finally {
          setIsSigningIn(false);
        }
      }
    },
    [formData, isSigningIn]
  );

  if (userLoggedIn) {
    return <Navigate to="/HomePage" replace />;
  }

  return (
    <main className="login-main">
      <div className="login-container">
        <div className="login-text">
          <div className="login-title">
            <h3 className="login-heading"></h3>
          </div>
        </div>
        <form onSubmit={onSubmit} className="login-form">
          <div className="login-input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="login-input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {errorMessage && <span className="login-error">{errorMessage}</span>}

          <button
            type="submit"
            disabled={isSigningIn}
            className={`login-button ${isSigningIn ? "disabled" : ""}`}
          >
            {isSigningIn ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <p className="login-signup">
          Don't have an account?{" "}
          <Link to="/register" className="login-signup-link">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginComponent;
