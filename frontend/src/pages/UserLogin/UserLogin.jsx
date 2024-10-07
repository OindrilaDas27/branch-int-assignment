import React, { useState } from 'react';
import axios from 'axios';
import { GET_USER_BY_EMAIL_ENDPOINT } from '../../utils/endpoints';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
    const [emailId, setEmailId] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const role = 'customer';

    const handleSignup = async (e) => {
        e.preventDefault();
        console.log('here is error');

        try {
            const checkAgentIsPresent = await axios.get(GET_USER_BY_EMAIL_ENDPOINT, {
                params: { emailId }
            });

            if (checkAgentIsPresent.data.exists) {
                const { userId } = checkAgentIsPresent.data;

                setMessage(`Login Successful: Welcome back`);
                navigate('/', { state: { userId, role } });
            } else {
                setMessage('User does not exist');
            }
        } catch (error) {
            console.log('Error in signup: ', error);
            setMessage('Error occured during signUp');
        }
    }
    return (
        <div className="center">
            <h1>Log In</h1>
            <form className='form' onSubmit={handleSignup}>
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

export default UserLogin