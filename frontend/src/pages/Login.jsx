import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";

const Login = () => {
  const { loginError, isloginLoading, loginUser, updateloginInfo, loginInfo } =
    useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    updateloginInfo({ email, password });
  }, [email, password]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await loginUser();
    if (!loginError) {
      setEmail("");
      setPassword("");
    }
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="loginpage">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button className="loginsubmit" type="submit">
          Login
        </button>
        <p className="ra">
          Create a new account ?
          <NavLink className="linkto" to="/register">
            Register
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Login;
