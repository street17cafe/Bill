import API from '../../Services/API'
import { snackbarSuccess, snackbarError } from './snackbar'
import errorutil from '../../Services/ErrorHandler'
import { emptyCart } from './Cart'
import { emptyMenu } from './Dish'

const page = "AUTH::"

export const login = (dispatch, data) => {

  API('/api/auth/login', data, '', 'POST')
    .then(res => {
      if(res.data.success){
        dispatch(snackbarSuccess("Logged in"))
        return dispatch({
          type: page+"LOGIN_SUCCESS",
          username: data.username,
          token: res.data.data.token
        })
        
      }
      throw new Error("Unable to login")
    })
    .catch(err => {
      console.log(err.response)
      dispatch({
        type: page+"LOGIN_FAIL"
      })
      dispatch(snackbarError(errorutil(err)))
    })

  return ({
    type: "AUTH::LOGIN_REQUEST"
  })
}

export const logout = (dispatch) => {
  dispatch(emptyCart())
  dispatch(emptyMenu())
  return({
    type: page+"LOGOUT"
  })
}

export const register = (dispatch, data) => {
  dispatch(initiateRegister(data))
  API('/api/auth/register', data, '', 'POST')
    .then(res => {
      console.log(res.data)
      if(res.data.token === undefined){
        throw new Error({message: "Unable to register"})
      }else{
        //dispatch(loggedIn(res.data))
        console.log("Data: ", res.data)
        // Auth.logUserIn({
        //   username: data.username,
        //   token: res.data.token,
        //   isLoggedIn: true
        // })
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
    type: page+"REGISTER",
    data
  }
)