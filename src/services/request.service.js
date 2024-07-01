import axios from 'axios';
import { deleteToken } from './auth.service';

axios.interceptors.response.use(function (response) {
    
    return response;
  }, function (error) {
    if(error.response.status === 401 ){
        deleteToken()
    }
    return Promise.reject(error);
  });

export default axios;
