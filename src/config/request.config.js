import axios from 'axios';
import { deleteToken } from '../services/auth.service';
import { PATHS, redirect } from '@/router';

axios.interceptors.response.use(function (response) {
    
    return response;
  }, function (error) {
    if(error.response.status === 401 ){
        deleteToken()
        redirect(PATHS.ROUTE_LOGIN)
    }
    return Promise.reject(error);
  });

export default axios;
