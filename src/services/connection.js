import axios from 'axios';

const connection= axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3030'
    // baseURL: 'https://backend-assifpi.herokuapp.com'
});

export default connection;