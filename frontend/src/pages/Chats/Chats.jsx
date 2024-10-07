import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { GET_THREADS_OF_USER_ENDPOINT, GET_THREAD_MESSAGES_ENDPOINT, CREATE_THREAD_MESSAGE_ENDPOINT } from '../../utils/endpoints';
import './Chats.css';

const Chats = () => {
    const location = useLocation();
    const { userId, initialMessage, initialThreadId } = location.state || {}; 
    const [threads, setThreads] = useState([]);
    const [selectedThread, setSelectedThread] = useState(null); 
    const [selectedThreadId, setSelectedThreadId] = useState(initialThreadId || null); 
    const [messages, setMessages] = useState([]); 
    const [messageInput, setMessageInput] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchThreads = async () => {
            try {
                const threadData = await axios.get(GET_THREADS_OF_USER_ENDPOINT(userId));
                console.log('Thread Data Response:', threadData.data);
                setThreads(threadData.data.threads || []);
            } catch (error) {
                console.log('Error fetching threads:', error);
            }
        };

        fetchThreads();
    }, [userId]);

    const fetchMessages = async (threadId) => {
        try {
            const response = await axios.get(GET_THREAD_MESSAGES_ENDPOINT(threadId));
            console.log("Response from fetch messages:", response.data);  // Check the API response
    
            if (response.data && response.data.messages) {
                console.log("Fetched messages:", response.data.messages);
                setMessages(response.data.messages); // Set messages from API
            } else {
                console.log("No messages found for the thread.");
            }
            setSelectedThreadId(threadId);
        } catch (error) {
            console.log("Error fetching messages:", error);
        }
    };
      
    

    const handleThreadClick = (threadId) => {
        setSelectedThread(threadId);
        fetchMessages(threadId); 
    };

    const handleSendMessage = async () => {
        if (messageInput.trim() === '' || !selectedThreadId) {
            console.log("Input is empty or no thread selected.");
            return;
        }
    
        try {
            const newMessage = {
                threadId: selectedThreadId,
                message: messageInput,
                role: 'customer',
            };
    
            const response = await axios.post(CREATE_THREAD_MESSAGE_ENDPOINT, newMessage);
            console.log('Response from send message:', response.data);  // Log the response
    
            if (response.data && response.data._id) {
                setMessages([...messages, response.data]); // Update state with the new message
                setMessageInput(''); // Clear the input field
            } else {
                console.log('No valid message data returned from API.');
            }
        } catch (error) {
            console.log('Error sending message:', error);
        }
    };
       

    return (
        <div className="chat-page">
            <div className="right-chat-panel">
                <h2>Your Threads</h2>
                <div className="thread-list">
                    {threads.length === 0 ? (
                        <p>No threads available.</p>
                    ) : (
                        threads.map((thread) => (
                            <div className="thread-container" key={thread._id || thread.threadId} onClick={() => handleThreadClick(thread._id)}>
                                <h4>Thread: {thread.title}</h4>
                                <p><strong>User Id:</strong> {thread.userId}</p>
                                <p><strong>Title:</strong> {thread.title}</p>
                                <p><strong>Created At:</strong> {new Date(thread.createdAt).toLocaleString()}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className="left-chat-panel">
                <h1>Customer Service Chat</h1>
                <div className="chat-window">
                    <div className="chat-bubble chat-bubble-right">
                        {initialMessage || 'Start chatting...'}
                    </div>
                    {messages.map((msg, index) => (
                        <div className={`chat-bubble ${msg.sender === userId ? 'chat-bubble-right' : 'chat-bubble-left'}`} key={index}>
                            {msg.content}
                        </div>
                    ))}
                </div>
                <div className="msg-container">
                    <textarea
                        value={messageInput}
                        placeholder="Type your message ..."
                        onChange={(e) => setMessageInput(e.target.value)}
                    />
                    <button style={{ width: "5rem", height: "3rem", marginLeft: "1rem" }} onClick={handleSendMessage} >Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chats;
