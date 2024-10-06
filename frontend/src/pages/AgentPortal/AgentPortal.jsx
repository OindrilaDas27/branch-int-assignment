import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GET_UNRESPONDED_ISSUES_ENDPOINT } from '../../utils/endpoints';
import './AgentPortal.css'

const AgentPortal = () => {
    const [issues, setIssues] = useState([]);
    const { state } = useLocation();
    const { userId, role } = state;

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const response = await axios.get(GET_UNRESPONDED_ISSUES_ENDPOINT);
                const fetchedIssues = Array.isArray(response.data) ? response.data : [response.data];
                setIssues(fetchedIssues);
                console.log(fetchedIssues); // Check the structure here
            } catch (error) {
                console.log('Error in fetching issues: ', error);
            }
        };
        fetchIssues();
    }, []);

    return (
        <div className='agent-portal'>
            <h2>Unresponded Issues</h2>
            <div className='issue-list'>
                {issues.length === 0 ? (
                    <p>No issues available.</p>
                ) : (
                    issues.map((issueGroup, index) => (
                        issueGroup.message.map((issue) => (
                            <div className='issue-container' key={issue._id}>
                                <div className='about'>
                                    <p><strong>User Id:</strong> {issue.userId}</p>
                                    {issue.priority==="high priority" ? <span>{issue.priority}</span> : <></>}
                                </div>
                                <p className='issue'>{issue.message}</p>
                                <p><strong>Created At:</strong> {new Date(issue.createdAt).toLocaleString()}</p>
                            </div>
                        ))
                    ))
                )}
            </div>
        </div>
    );
};

export default AgentPortal;
