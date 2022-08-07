import axios from 'axios'
import { createBrowserHistory } from 'history';

let newHistory = () => {
    try {
        const xhr = new XMLHttpRequest();
        xhr.abort();
    } catch(err) {}
    return createBrowserHistory();
}

axios.interceptors.request.use(request => { return request })
axios.interceptors.response.use(
  response => {
    return response;
  },
  
  error => {

    console.log(error.response);
    if (error && error.response && error.response.status === 401) {
      localStorage.removeItem('Authorization');
      newHistory.push('/login');
    }
    return Promise.reject(error)
  }
)