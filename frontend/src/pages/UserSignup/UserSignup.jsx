import React, { useState } from 'react';
import axios from 'axios';
import { CREATE_USER_ENDPOINT } from '../../utils/endpoints';
import { useNavigate } from 'react-router-dom';

const UserSignup = () => {
  const [emailId, setEmailId] = useState('');
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const role = 'customer';

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(CREATE_USER_ENDPOINT, {
        emailId: emailId,
        userName: userName,
        role: role
      });

      const userId = response.data.user._id;
      console.log(response.data)
      setMessage(`Signup Successful: ${JSON.stringify(response.data)}`);
      console.log(userId)
      navigate('/', { state: { userId, role } });
    } catch (error) {
      console.log('Error in signup: ', error);
      setMessage('Error occured during signUp');
    }
  }

  return (
    <div className="center">
      <h1>SignUp</h1>
      <form className='form' onSubmit={handleSignup}>
        <div className='form-container'>
          <h4>Enter your user name</h4>
          <input type='text' placeholder='Enter your username' value={userName} onChange={(e) => setUserName(e.target.value)} required />
        </div>
        <div className='form-container'>
          <h4>Enter your email</h4>
          <input type='email' placeholder='Enter your email' value={emailId} onChange={(e) => setEmailId(e.target.value)} required />
        </div>
        <button type='submit'>Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default UserSignup