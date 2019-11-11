import { snackbarSuccess, snackbarError } from './snackbar'
import fetchAPI from '../../Services/API'
import Auth from '../../Services/AuthService'


const PAGE = "AUTH::"

export const login = (dispatch, data) => {
  dispatch(initiateLogin(data))
  fetchAPI('/api/auth/login', data, '', 'POST')
    .then(res => {
      console.log(res.data)
      if(res.data.token === undefined){
        throw new Error({message: "Unable to login"})
      }else{
        dispatch(loggedIn(res.data))
        Auth.logUserIn({
          username: data.username,
          token: res.data.token,
          isLoggedIn: true
        })
        dispatch(snackbarSuccess("Logged In"))
      }
    })
    .catch(err => {
      console.log(err.response.data.message)
      dispatch(snackbarError(err.response.data.message || err.message))
    })
}

const initiateLogin = (data) => ({
    type: PAGE+"LOGIN",
    data
  }
)

const loggedIn = (data) => ({
  type: PAGE+"LOGGEDIN",
  data
})

export const register = (dispatch, data) => {
  dispatch(initiateRegister(data))
  fetchAPI('/api/auth/register', data, '', 'POST')
    .then(res => {
      console.log(res.data)
      if(res.data.token === undefined){
        throw new Error({message: "Unable to register"})
      }else{
        dispatch(loggedIn(res.data))
        Auth.logUserIn({
          username: data.username,
          token: res.data.token,
          isLoggedIn: true
        })
        dispatch(snackbarSuccess("Registartion successfull"))
      }
    })
    .catch(err => {
      console.log(err.response.data.message)
      dispatch(snackbarError(err.response.data.message || err.message))
    })
}

const initiateRegister = (data) => ({
    type: PAGE+"REGISTER",
    data
  }
)