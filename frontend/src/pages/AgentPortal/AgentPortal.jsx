import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CLAIM_ISSUE_ENDPOINT, GET_THREADS_BY_AGENTID_ENDPOINT, GET_UNRESPONDED_ISSUES_ENDPOINT } from '../../utils/endpoints';
import './AgentPortal.css';
import PopUp from '../../components/PopUp/PopUp';

const AgentPortal = () => {
    const [issues, setIssues] = useState([]);
    const [threads, setThreads] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [threadTitle, setThreadTitle] = useState("");
    const { state } = useLocation();
    const navigate = useNavigate();
    const { userId, role } = state; 

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const response = await axios.get(GET_UNRESPONDED_ISSUES_ENDPOINT);
                const fetchedIssues = Array.isArray(response.data) ? response.data : [response.data];
                setIssues(fetchedIssues);
            } catch (error) {
                console.log('Error in fetching issues: ', error);
            }
        };

        const fetchThreads = async () => {
            try {
                const threadData = await axios.get(GET_THREADS_BY_AGENTID_ENDPOINT(userId));
                const fetchedThreads = threadData.data.threads || []; 
                setThreads(fetchedThreads);
            } catch (error) {
                console.log('Error in fetching threads: ', error);
            }
        };

        fetchIssues();
        fetchThreads();
    }, [userId]);

    const claimIssue = async () => {
        try {
            const response = await axios.post(CLAIM_ISSUE_ENDPOINT, {
                userId,
                _id: selectedIssue._id,
                threadName: threadTitle,
            });
    
            console.log('Response from claimIssue API: ', response.data);
    
            setShowPopup(false);
            setThreadTitle("");
            setSelectedIssue(null);
    
            const threadIdMsg = response.data['threadId and msgId']; 
            if (threadIdMsg) {
                const threadId = threadIdMsg.split(' ')[0];
                const msgId = response.data.messageId;
    
                console.log('Extracted threadId: ', threadId);
                console.log('Extracted msgId: ', msgId);
    
                if (threadId) {
                    navigate(`/agent-chat/${threadId}`, { state: { threadId, userId, threadTitle } });
                }
            } else {
                console.error('threadId is missing in the response');
            }
        } catch (error) {
            console.log('Error claiming issue: ', error);
        }
    };
    
    

    const handleClaimClick = (issue) => {
        setSelectedIssue(issue);
        setShowPopup(true);
    }

    return (
        <div className='agent-portal'>
            <div className='left-panel'>
                <h2>Unresponded Issues</h2>
                <div className='issue-list'>
                    {issues.length === 0 ? (
                        <p>No issues available.</p>
                    ) : (
                        issues.map((issueGroup) => (
                            issueGroup.message.map((issue) => (
                                <div className='issue-container' key={issue._id}>
                                    <div className='about'>
                                        <p><strong>User Id:</strong> {issue.userId}</p>
                                        {issue.priority === "high priority" && <span>{issue.priority}</span>}
                                    </div>
                                    <p className='issue'>{issue.message}</p>
                                    <div className='claim'>
                                        <p><strong>Created At:</strong> {new Date(issue.createdAt).toLocaleString()}</p>
                                        <button onClick={() => handleClaimClick(issue)}>Claim</button>
                                    </div>
                                </div>
                            ))
                        ))
                    )}
                </div>
            </div>

            <div className='right-panel'>
                <h2>Your Threads</h2>
                <div className="thread-list">
                    {threads.length === 0 ? (
                        <p>No threads available.</p>
                    ) : (
                        threads.map((thread) => (
                            <div className="thread-container" key={thread._id || thread.threadId}>
                                <h4>Thread: {thread.title}</h4>
                                <p><strong>User Id:</strong> {thread.userId}</p>
                                <p><strong>Title:</strong> {thread.title}</p>
                                <p><strong>Created At:</strong> {thread.createdAt ? new Date(thread.createdAt).toLocaleString() : 'N/A'}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
            {showPopup && (
                <PopUp
                    show={showPopup}
                    handleClose={() => setShowPopup(false)}
                    handleSave={claimIssue}
                    title={threadTitle}
                    setTitle={setThreadTitle}
                />
            )}
        </div>
    );
};

export default AgentPortal;
