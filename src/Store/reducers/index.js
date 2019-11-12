import { combineReducers } from 'redux'
import Snackbar from './snackbar'
import Auth from './auth'
import Cart from './Cart'

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
  },
  Cart: {
    items: []
  }
}

const reducers = combineReducers({
  Snackbar,
  Auth,
  Cart
})

export default reducers;