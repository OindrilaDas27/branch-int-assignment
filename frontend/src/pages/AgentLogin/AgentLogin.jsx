import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CREATE_USER_ENDPOINT, GET_USER_BY_EMAIL_ENDPOINT } from '../../utils/endpoints';

const AgentLogin = () => {
    const [emailId, setEmailId] = useState('');
    const [userName, setUserName] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const role = 'agent';

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const checkAgentIsPresent = await axios.get(GET_USER_BY_EMAIL_ENDPOINT(emailId));

            if (checkAgentIsPresent.data.exists) {
                const userId = checkAgentIsPresent.data.userId;

                setMessage(`Login Successful: Welcome back, ${userName}`);
                console.log(checkAgentIsPresent.data)
                navigate('/agent-portal', { state: { userId, role } });
            } else {
                const response = await axios.post(CREATE_USER_ENDPOINT, {
                    emailId: emailId,
                    userName: userName,
                    role: role
                });

                const userId = response.data.user._id;
                setMessage(`Login Successful: ${JSON.stringify(response.data)}`);

                console.log(response.data)
                navigate('/agent-portal', { state: { userId, role } });
            }
        } catch (error) {
            console.log('Error in login: ', error);
            setMessage('Error occured during login');
        }
    }

    return (
        <div className="center">
            <h1>Agent Login</h1>
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

export default AgentLogin