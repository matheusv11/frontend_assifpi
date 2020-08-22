import axios from 'axios';

const connection= axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3030',
    // baseURL: 'https://backend-assifpi.herokuapp.com'
});

// const Interceptor= connection.interceptors.request.use((config) => {
//     console.info("✉️ ", config)
//     return config;
// }, (error) => {
//     console.error("✉️ ERROR ", error); 
//     return Promise.reject(error);
// });

// connection.interceptors.request.eject(Interceptor);

export default connection;