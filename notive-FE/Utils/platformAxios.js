import axios from 'axios'
import * as Constants from './Constants';

export const platformAxios = axios.create({
    baseURL: Constants.URL,
});

export const authenticatedAxios = axios.create({
    baseURL: Constants.URL,
    headers: {
        'Authorization': `Token ${localStorage.getItem(Constants.USER_TOKEN)}`
        // 'Authorization': localStorage.getItem('token')

    }
});