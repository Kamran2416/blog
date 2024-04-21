import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";
import "../components/styles/Signup.css";
import { Alert } from "react-bootstrap"; // Import Bootstrap Alert component

const AuthPage = () => {
  const authContext = useContext(AuthContext);
  const { login, createUser } = authContext;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    isLogin: true,
  });

  const { email, password, confirmPassword, isLogin } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin) {
      // Check if passwords match
      if (password !== confirmPassword) {
        showAlert("Passwords do not match", "danger");
        return;
      }
    }

    // Regular expression for email validation
    const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,}$/;

    // Regular expression for password validation (at least 6 characters with both alphabetic and numeric characters)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    // Check if email is valid
    if (!emailRegex.test(email)) {
      showAlert("Please enter a valid email address", "danger");
      return;
    }

    // Check if password is valid
    if (!passwordRegex.test(password)) {
      showAlert(
        "Your password must meet the following criteria:\n" +
        "- At least 8 characters long\n" +
        "- At least one alphabetic character\n" +
        "- At least one digit\n" +
        "- At least one special character (!@#$%^&*)\n" +
        "Example: MyP@ssw0rd!",
        "danger"
      );
      return;
    }

    if (isLogin) {
      // Login
      console.log("Logged in");
      const success = await login({ email, password });
      if (success) {
        // Redirect to home page after successful login
        console.log("Done Login");
        window.location.href = "/home";
      }
    } else {
      // Sign up
      createUser({ email, password, confirmPassword });
      showAlert("Account created successfully!", "success");
    }
  };

  const showAlert = (message, variant) => {
    // Display Bootstrap Alert dynamically
     const alertBox = (
      <Alert variant={variant} onClose={() => setAlert(null)} dismissible>
        <div dangerouslySetInnerHTML={{ __html: message.replace(/\n/g, '<br>') }} />
      </Alert>
    );
    setAlert(alertBox);
  };

  const [alert, setAlert] = useState(null);

  return (
    <div className="sBody">
      {alert} {/* Display the Bootstrap alert box */}
      <div className="wrapper">
        <div className="title-text">
          <div className={`title ${isLogin ? "login" : "signup"}`}>Account</div>
          <div className={`title ${isLogin ? "signup" : "login"}`}>Account</div>
        </div>
        <div className="form-container">
          <div className="slide-controls">
            <input
              type="radio"
              name="slide"
              id="login"
              checked={isLogin}
              onChange={() => setFormData({ ...formData, isLogin: true })}
            />
            <input
              type="radio"
              name="slide"
              id="signup"
              checked={!isLogin}
              onChange={() => setFormData({ ...formData, isLogin: false })}
            />
            <label htmlFor="login" className="slide login">
              Login
            </label>
            <label htmlFor="signup" className="slide signup">
              Sign Up
            </label>
            <div className="slider-tab"></div>
          </div>
          <div className="form-inner">
            {isLogin ? (
              <form action="#" className="login" onSubmit={handleSubmit}>
                <div className="field">
                  <input
                    type="text"
                    placeholder="Email Address"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                  />
                </div>
                <div className="field">
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                  />
                </div>
                <div className="pass-link">
                  <a href="#">Reset password?</a>
                </div>
                <div className="field btn">
                  <div className="btn-layer"></div>
                  <input type="submit" value="Login" />
                </div>
                <div className="signup-link">
                  Don't Have Account?{" "}
                  <Link onClick={() => setFormData({ ...formData, isLogin: false })}>
                    Create A New
                  </Link>
                </div>
              </form>
            ) : (
              <form action="#" className="signup" onSubmit={handleSubmit}>
                <div className="field">
                  <input
                    type="text"
                    placeholder="Email Address"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                  />
                </div>
                <div className="field">
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                  />
                </div>
                <div className="field">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword}
                    required
                  />
                </div>
                <div className="field btn">
                  <div className="btn-layer"></div>
                  <input type="submit" value="Sign Up" />
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
