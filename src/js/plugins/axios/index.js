import axios from 'axios';
import API_ENV from '../../config/api.config'
const instance = axios.create({
  baseURL: API_ENV.apiUrl,
  headers:{
    'Content-Type': 'application/json'
  }
})

export default instance;