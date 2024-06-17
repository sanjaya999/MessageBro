import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

const Register = () => {
  const { registerInfo, updateRegisterInfo,isRegisterLoading ,registerUser ,registerError} = useContext(AuthContext);
  const [userName, setuserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      setuserName('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {registerError && <p style={{color: 'red'}}>{registerError}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">userName:</label>
          <input
            type="text"
            id="name"
            value={userName}
            onChange={handleNameChange}
            required
          />
        </div>
        
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
        <button type="submit">{isRegisterLoading? "creating account":"register"}</button>
      </form>
    </div>
  );
};

export default Register;
