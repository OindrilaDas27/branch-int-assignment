import axios from 'axios';
import React, { useState } from 'react'
import { CREATE_ISSUE_ENDPOINT } from '../../utils/endpoints';
import { useLocation, useNavigate } from 'react-router-dom';

const CreateIssue = () => {
    const location = useLocation();
    const { userId, role } = location.state || {};
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSendMessage = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(CREATE_ISSUE_ENDPOINT, {
                message,
                userId,
                role,
            });
            console.log(response.data)
            console.log(userId, role, response.data.messageId);
            navigate('/chats', { state: { userId, role} })
            setMessage('');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='center'>
            <div className='chat-container'>
                <h1>Customer Service Chat</h1>
                <div className='chat-history'>
                    <div></div>
                </div>
                <form onSubmit={handleSendMessage}>
                    <h4>How can we help you?</h4>
                    <div className='form-container'>
                        <textarea
                            type="text"
                            placeholder='Tell us your issues ... '
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            rows={4}
                        />
                        <button type='submit'>Send</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateIssue 