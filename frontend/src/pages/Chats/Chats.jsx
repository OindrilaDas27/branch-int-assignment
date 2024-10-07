import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { GET_THREADS_OF_USER_ENDPOINT, GET_THREAD_MESSAGES_ENDPOINT, CREATE_THREAD_MESSAGE_ENDPOINT, GET_UNRESPONDED_ISSUES_ENDPOINT, GET_MSG_BY_USER_ENDPOINT } from '../../utils/endpoints';
import './Chats.css';

const Chats = () => {
    const location = useLocation();
    const { userId } = location.state || {};
    const [threads, setThreads] = useState([]);
    const [selectedThread, setSelectedThread] = useState(null);
    const [selectedThreadId, setSelectedThreadId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [issues, setIssues] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchThreads = async () => {
            try {
                const threadData = await axios.get(GET_THREADS_OF_USER_ENDPOINT(userId));
                console.log('Thread Data Response:', threadData.data);
                const fetchedThreads = threadData.data.threads || [];
                setThreads(fetchedThreads);
            } catch (error) {
                console.log('Error fetching threads:', error);
            }
        };
        const fetchIssues = async () => {
            try {
                const response = await axios.get(GET_MSG_BY_USER_ENDPOINT(userId));
                console.log(response.data)
                const fetchedIssues = response.data;
                setIssues(fetchedIssues);
            } catch (error) {
                console.log('Error in fetching issues: ', error);
            }
        };

        fetchThreads();
        fetchIssues();
    }, [userId]);

    const fetchMessages = async (threadId) => {
        try {
            const response = await axios.get(GET_THREAD_MESSAGES_ENDPOINT(threadId));
            console.log("Response from fetch messages:", response.data);
            setMessages(response.data.messages || []);
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
            console.log('Response from send message:', response.data);

            setMessages([...messages, response.data]); // Append new message to the current messages
            setMessageInput('');
        } catch (error) {
            console.log('Error sending message:', error);
        }
    };


    return (
        <div className="chat-page">
            <div className="right-chat-panel">
                <div className='top'>
                    <h2>Unresolved Queries</h2>
                    <div className='issue-list'>
                        {issues.messages && issues.messages.length === 0 ? (
                            <p>No issues available.</p>
                        ) : (
                            issues.messages && issues.messages.map((issue) => (
                                (issue.messageStatus === 'unresolved' ? (
                                    <div className='issue-container' key={issue._id}>
                                        <p className='issue'>{issue.message}</p>
                                        <div className='claim'>
                                            <p><strong>Created At:</strong> {new Date(issue.createdAt).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ) : <></>)
                            ))
                        )}
                    </div>
                </div>
                <div className='bottom'>
                    <h2>Resolved Issues/Queries</h2>
                    <div className="thread-list">
                        {threads.length === 0 ? (
                            <p>No threads available.</p>
                        ) : (
                            threads.map((thread) => (
                                <div className={`thread-container ${selectedThreadId === (thread._id || thread.threadId) ? 'selected-thread' : ''}`}
                                    key={thread._id || thread.threadId}
                                    onClick={() => fetchMessages(thread._id || thread.threadId)} >
                                    <h4>Thread: {thread.title}</h4>
                                    <p><strong>User Id:</strong> {thread.userId}</p>
                                    <p><strong>Title:</strong> {thread.title}</p>
                                    <p><strong>Created At:</strong> {thread.createdAt ? new Date(thread.createdAt).toLocaleString() : 'N/A'}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <div className="left-chat-panel">
                <h1>Customer Service Chat</h1>
                <div className="chat-window">
                    {messages.length === 0 ? (
                        <p>Select a thread to view messages</p>
                    ) : (
                        messages.map((msg) => (
                            <div className={`chat-bubble ${msg.role === 'customer' ? 'chat-bubble-right' : 'chat-bubble-left'}`} key={msg._id}>
                                <p>{msg.message}</p>
                                <p>{new Date(msg.createdAt).toLocaleString()}</p>
                            </div>
                        ))
                    )}
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
