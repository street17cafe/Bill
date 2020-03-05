import axios from 'axios'
import AuthService from './AuthService'

const BACKEND_URL = process.env.REACT_APP_URL
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

  //console.log("URL: ", process.env.PUBLIC_URL)

  return axios(`${BACKEND_URL}${endpoint}`, axiosConfig)
  //return axios(`${endpoint}`, axiosConfig)
}