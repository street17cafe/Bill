import { combineReducers } from 'redux'
import Snackbar from './snackbar'
import Auth from './auth'

export const initialState = {
  Snackbar: {
    open: false,
    message: 'This is default message',
    type: 'success',
    duration: 6000
  },
  Auth: {
    isLoggedIn: true,
    errorMessage: '',
    username: '',
    isChecking: false,
    token: ''
  }
}

const reducers = combineReducers({
  Snackbar,
  Auth
})

export default reducers;