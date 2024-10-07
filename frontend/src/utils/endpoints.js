// const BASE_URL = process.env.BACKEND_URL;
const BASE_URL = 'http://localhost:5000/api';
console.log("Environment Variable:", process.env); // Log all environment variables

console.log('BASE_URL: ', BASE_URL);

const CREATE_USER_ENDPOINT = `${BASE_URL}/user/create-user`;
const GET_USER_BY_ID_ENDPOINT = (userId) => `${BASE_URL}/user/${userId}`;
const CREATE_ISSUE_ENDPOINT = `${BASE_URL}/msg`;
const GET_UNRESPONDED_ISSUES_ENDPOINT = `${BASE_URL}/msg`;
const GET_USER_BY_EMAIL_ENDPOINT = (emailId) =>`${BASE_URL}/user/email/${emailId}`;
const GET_THREADS_BY_AGENTID_ENDPOINT = (agentId) => `${BASE_URL}/thread/get-agent-thread/${agentId}`;
const GET_THREADS_OF_USER_ENDPOINT = (userId) => `${BASE_URL}/thread/get-all-thread/${userId}`;
const CLAIM_ISSUE_ENDPOINT = `${BASE_URL}/msg/claim`;
const GET_THREAD_MESSAGES_ENDPOINT = (threadId) => `${BASE_URL}/msg/thread/${threadId}`;
const CREATE_THREAD_MESSAGE_ENDPOINT = `${BASE_URL}/msg/thread`;
const GET_MSG_BY_USER_ENDPOINT = (userId) =>  `${BASE_URL}/msg/user/${userId}`
const GET_MSG_BY_MSGID_ENDPOINT = (msgId) =>  `${BASE_URL}/msg/issue/${msgId}`


export { 
    CREATE_USER_ENDPOINT, 
    GET_USER_BY_ID_ENDPOINT, 
    CREATE_ISSUE_ENDPOINT, 
    GET_UNRESPONDED_ISSUES_ENDPOINT,
    GET_USER_BY_EMAIL_ENDPOINT,
    GET_THREADS_BY_AGENTID_ENDPOINT,
    GET_THREADS_OF_USER_ENDPOINT,
    CLAIM_ISSUE_ENDPOINT,
    GET_THREAD_MESSAGES_ENDPOINT,
    CREATE_THREAD_MESSAGE_ENDPOINT,
    GET_MSG_BY_USER_ENDPOINT,
    GET_MSG_BY_MSGID_ENDPOINT
};