import axios from 'axios';

const basicAuthToken = localStorage.getItem('Authorization')
export default axios.create({
    /**
     * @todo Add baseurl in configuration files
     */
    baseURL: 'http://localhost:8000/api',
    headers: {
        "Authorization": `Basic ${basicAuthToken}`,
    }
});