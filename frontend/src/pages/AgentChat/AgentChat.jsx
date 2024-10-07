import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './AgentChat.css';
import axios from 'axios';
import { GET_THREADS_BY_AGENTID_ENDPOINT, GET_THREAD_MESSAGES_ENDPOINT, CREATE_THREAD_MESSAGE_ENDPOINT, GET_USER_BY_ID_ENDPOINT } from '../../utils/endpoints';

const AgentChat = () => {
    const { state } = useLocation();
    const { userId, role, threadId: initialThreadId, threadTitle: initialThreadTitle } = state || {};
    const [threads, setThreads] = useState([]);
    const [selectedThreadId, setSelectedThreadId] = useState(initialThreadId || null);
    const [selectedThreadTitle, setSelectedThreadTitle] = useState(initialThreadTitle || '');
    const [customerId, setCustomerId] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [numQueries, setNumQueries] = useState('');
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [getUserInfo, setGetUserInfo] = useState(null);

    let cannedText = ['Hello, how can I assist you ',
        'Please provide more details about your request.',
        'Thank you for reaching out!']

    useEffect(() => {
        const fetchThreads = async () => {
            try {
                const threadData = await axios.get(GET_THREADS_BY_AGENTID_ENDPOINT(userId));
                const fetchedThreads = threadData.data.threads || [];
                setThreads(fetchedThreads);

                // If a threadId is passed, automatically fetch messages for that thread
                if (initialThreadId) {
                    fetchMessages(initialThreadId);
                } else if (fetchedThreads.length > 0) {
                    // If no initial threadId is passed, select the first thread and fetch its messages
                    const firstThread = fetchedThreads[0];
                    fetchMessages(firstThread._id || firstThread.threadId);
                    setSelectedThreadTitle(firstThread.title);
                }
            } catch (error) {
                console.log('Error in fetching threads: ', error);
            }
        };
        fetchThreads();
    }, [userId, initialThreadId]);

    // Fetch messages for the selected thread
    const fetchMessages = async (threadId) => {
        try {
            const messageData = await axios.get(GET_THREAD_MESSAGES_ENDPOINT(threadId));
            setMessages(messageData.data.messages || []);
            setSelectedThreadId(threadId);

            // Fetch and set the title for the selected thread if not already available
            const thread = threads.find(thread => thread._id === threadId);
            console.log('Thread: ', thread);
            if (thread) {
                setSelectedThreadTitle(thread.title);
                fetchUserInfo(thread.userId)
            }
        } catch (error) {
            console.log('Error in fetching messages: ', error);
        }
    };

    const fetchUserInfo = async (userId) => {
        try {
            const response = await axios.get(GET_USER_BY_ID_ENDPOINT(userId));
            const user = response.data;
            console.log(user);

            setCustomerEmail(user.emailId);
            setCustomerId(user._id);
            setNumQueries(user.numberOfQueries)
        } catch (error) {
            console.log(error);
        }
    }

    const handleSendMessage = async () => {
        if (messageInput.trim() === '' || !selectedThreadId) return;

        try {
            const newMessage = {
                threadId: selectedThreadId,
                message: messageInput,
                role: role,
            };
            const response = await axios.post(CREATE_THREAD_MESSAGE_ENDPOINT, newMessage);
            setMessages([...messages, response.data]); // Append new message to the current messages
            setMessageInput(''); // Clear the input after sending the message
        } catch (error) {
            console.log('Error sending message:', error);
        }
    };

    const handleCannedClick = (msg) => {
        setMessageInput(msg)
        handleSendMessage()
        console.log(msg)
    }

    return (
        <div className='chat-page'>
            <div className='right-chat-panel'>
                <h2>Your Threads</h2>
                <div className="thread-list">
                    {threads.length === 0 ? (
                        <p>No threads available.</p>
                    ) : (
                        threads.map((thread) => (
                            <div
                                className={`thread-container ${selectedThreadId === (thread._id || thread.threadId) ? 'selected-thread' : ''}`}
                                key={thread._id || thread.threadId}
                                onClick={() => fetchMessages(thread._id || thread.threadId)}
                            >
                                <h4>Thread: {thread.title}</h4>
                                <p><strong>User Id:</strong> {thread.userId}</p>
                                <p><strong>Title:</strong> {thread.title}</p>
                                <p><strong>Created At:</strong> {thread.createdAt ? new Date(thread.createdAt).toLocaleString() : 'N/A'}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className='left-chat-panel'>
                <h1> Customer Service Chat</h1>
                <div className='top-bar'>
                    <h4>{selectedThreadTitle || "Select a thread"}</h4>
                    <div className='user-info'>
                        <h4>Customer Information</h4>
                        <p>Customer Email: {customerEmail}</p>
                        <p>Total Number of Queries: {numQueries}</p>
                    </div>
                </div>
                <div className='chat-window'>
                    {(!Array.isArray(messages) || messages.length === 0) ? (
                        <p>Select a thread to view messages</p>
                    ) : (
                        messages.map((msg) => (
                            <div className={`chat-bubble ${msg.role === role ? 'chat-bubble-right' : 'chat-bubble-left'}`} key={msg._id}>
                                <p>{msg.message}</p>
                                <p>{new Date(msg.createdAt).toLocaleString()}</p>
                            </div>
                        ))
                    )}
                </div>
                <div className='canned-message-container'>
                    <div className='canned-message' onClick={() => { handleCannedClick(cannedText[0]) }}>{cannedText[0]}</div>
                    <div className='canned-message' onClick={() => { handleCannedClick(cannedText[1]) }}>{cannedText[1]}</div>
                    <div className='canned-message' onClick={() => { handleCannedClick(cannedText[2]) }}>{cannedText[2]}</div>
                </div>
                <div className='msg-container'>
                    <textarea
                        value={messageInput}
                        placeholder='Type your message ...'
                        onChange={(e) => setMessageInput(e.target.value)}
                    />
                    <button
                        style={{ width: "5rem", height: "3rem", marginLeft: "1rem" }}
                        onClick={handleSendMessage}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AgentChat;
