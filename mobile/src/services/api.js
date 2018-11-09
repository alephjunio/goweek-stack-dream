import axios from 'axios';

const api = axios.create({
    // Android
     baseURL:'http://10.0.2.2:3000'
     // Genymotion
     // baseURL:'http://10.0.3.2:3000'
});

export default api;
