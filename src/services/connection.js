import axios from 'axios';

const connection= axios.create({
    baseURL: 'http://localhost:3030'
});

export default connection;