import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { GET_MSG_BY_MSGID_ENDPOINT } from '../../utils/endpoints';

const Waiting = () => {
    const location = useLocation();
    const { userId, role, msgId } = location.state || {}; 
    const navigate = useNavigate();
    const [waiting, setWaiting] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Waiting: ', userId, role, msgId);

        const fetchMessage = async () => {
            setLoading(true); // Start loading
            try {
                const messageData = await axios.get(GET_MSG_BY_MSGID_ENDPOINT(msgId));
                console.log('Message Data:', JSON.stringify(messageData.data, null, 2));

                // Find the message using the correct ID
                const messageWithThread = messageData.data.messages.find(msg => msg.threadId && msg.id === msgId); // Updated to use _id
                
                if (messageWithThread) {
                    setWaiting(false);
                    navigate(`/chats/${messageWithThread.threadId}`, { 
                        state: { 
                            userId, 
                            initialMessage: messageWithThread.message, 
                            initialThreadId: messageWithThread.threadId 
                        } 
                    });
                } else {
                    console.log('No message found with the specified msgId.');
                }
            } catch (error) {
                console.error('Error fetching messages:', error.response ? error.response.data : error);
                setError('Error fetching messages. Please try again later.'); // Set error state
            } finally {
                setLoading(false); // End loading
            }
        };

        const intervalId = setInterval(fetchMessage, 3000); // Check every 3 seconds

        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, [userId, role, msgId, navigate]);

    return (
        <div className='waiting-screen'>
            {loading && <p>Loading... Please wait.</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            {!loading && !error && (
                <>
                    <h2>Your issue is being processed!</h2>
                    <p>Waiting for an agent to claim your issue and create a thread...</p>
                </>
            )}
        </div>
    );
};

export default Waiting;
