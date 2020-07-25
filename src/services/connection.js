import axios from 'axios';

const connection= axios.create({
    baseURL: 'http://localhost:3030'
    // baseURL: 'https://backend-assifpi.herokuapp.com'
});

export default connection;