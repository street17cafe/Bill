import axios from 'axios'
import AuthService from './AuthService'

const BACKEND_URL = "http://localhost:3002"
export default function fetchAPI(endpoint, payload, headers, method = 'get'){
  const axiosConfig = {
      headers: {
          Authorization: "Bearer "+AuthService.getToken(),
          ...headers
      },
      method: method.toLowerCase()
  };
  if(axiosConfig.method === 'get'){
      axiosConfig.params = payload
  } else {
      axiosConfig.data = payload
  }

  return axios(`${BACKEND_URL}${endpoint}`, axiosConfig)

}