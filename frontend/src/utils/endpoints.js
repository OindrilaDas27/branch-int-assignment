// const BASE_URL = process.env.BACKEND_URL;
const BASE_URL = 'http://localhost:5000/api';
console.log("Environment Variable:", process.env); // Log all environment variables

console.log('BASE_URL: ', BASE_URL);

const CREATE_USER_ENDPOINT = `${BASE_URL}/user/create-user`;
const GET_USER_ENDPOINT = `${BASE_URL}/user/get-user`;
const CREATE_ISSUE_ENDPOINT = `${BASE_URL}/msg/create-msg`;

export { CREATE_USER_ENDPOINT, GET_USER_ENDPOINT, CREATE_ISSUE_ENDPOINT };