import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { NavLink } from "react-router-dom";

const Register = () => {
  const {
    registerInfo,
    updateRegisterInfo,
    isRegisterLoading,
    registerUser,
    registerError,
  } = useContext(AuthContext);
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    updateRegisterInfo({ userName, email, password });
  }, [userName, email, password]);

  const handleNameChange = (e) => {
    setuserName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser();
    if (!registerError) {
      setuserName("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="loginpage">
      <h2>Register</h2>
      {registerError && <p style={{ color: "red" }}>{registerError}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Username:</label>
          <input
            className="inputemail"
            type="text"
            id="name"
            value={userName}
            onChange={handleNameChange}
            required
          />
        </div>

        <div>
          <label className="email" htmlFor="email">
            Email:
          </label>
          <input
            className="inputemail"
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label className="password" htmlFor="password">
            Password:
          </label>
          <input
            className="inputpassword"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button className="loginsubmit">
          {isRegisterLoading ? "creating account" : "register"}
        </button>
        <p className="ra">
          Already have an account?{" "}
          <NavLink className="linkto" to="login">
            Login
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Register;
