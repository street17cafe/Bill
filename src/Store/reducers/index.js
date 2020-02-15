import { combineReducers } from 'redux'
import Snackbar from './snackbar'
import Auth from './auth'
import Cart from './Cart'
import Dish from './Dish'
import Bills from './Bill'

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
  },
  Dish: {
    data: [],
    isFetching: false,
    error: true
  },
  Bills: {
    isFetching: false,
    error: false,
    data: []
  }
}

const reducers = combineReducers({
  Snackbar,
  Auth,
  Cart,
  Dish,
  Bills
})

export default reducers;