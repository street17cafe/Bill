import { snackbarSuccess, snackbarError } from './snackbar'
import fetchAPI from '../../Services/API'
import Auth from '../../Services/AuthService'
import ErrorHandler from '../../Services/ErrorHandler'


const PAGE = "AUTH::"

export const login = (dispatch, data) => {
  dispatch(initiateLogin(data))
  fetchAPI('/api/auth/login', data, '', 'POST')
    .then(res => {
      console.log(res.data)
      if(res.data.success === false){
        throw new Error({message: "Unable to login"})
      }else{
        console.log("Data: ", res.data)
        Auth.logUserIn({
          username: data.username,
          token: res.data.data.token,
          isLoggedIn: true
        })
        dispatch(snackbarSuccess("Logged In"))
        dispatch(loggedIn(res.data))
        console.log(res.data)
      }
    })
    .catch(err => {
      console.error(err)
      //console.log(err.response.data.message)
      dispatch(snackbarError(ErrorHandler(err)))
      dispatch(error())
    })
}

const initiateLogin = (data) => ({
    type: PAGE+"LOGIN",
    data
  }
)

const loggedIn = (data) => ({
  type: PAGE+"SUCCESS",
  data
})

const error = data => ({
  type: PAGE+"ERROR"
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
        console.log("Data: ", res.data)
        Auth.logUserIn({
          username: data.username,
          token: res.data.token,
          isLoggedIn: true
        })
        dispatch(snackbarSuccess("Registartion successfull"))
      }
    })
    .catch(err => {
      console.error("Error: ", err.response)
      console.error("Error: ", err);
      //console.log(err.response.data.message)
      //dispatch(snackbarError(err.response.data.errors.message || err.message))
    })
}

const initiateRegister = (data) => ({
    type: PAGE+"REGISTER",
    data
  }
)