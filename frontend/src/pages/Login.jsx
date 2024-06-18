import React, { useContext, useState,useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';


const Login = () => {
  const {loginError,
    isloginLoading,
    loginUser,
    updateloginInfo,
    loginInfo} = useContext(AuthContext)


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    updateloginInfo({  email, password });
  }, [ email, password]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit =async(e) => {
    e.preventDefault();
    
    await loginUser();
    if (!loginError) {
      setEmail('');
      setPassword('');
    }
    console.log('Email:', email);
    console.log('Password:', password);
        
  };

  return (

    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;