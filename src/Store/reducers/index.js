import { combineReducers } from 'redux'
import Snackbar from './snackbar'
import Auth from './auth'
import Cart from './Cart'
import Dish from './Dish'
import Bills from './Bill'
import Settings from './Settings'

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
    isRequesting: false,
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
    data: [],
    billItems: [],
    deleteRequest: false,
    errorDeleting: false
  },
  Settings: {
    autoRefreshBills: false,
    renderImages: false,
    dark: false,
    autoRefreshMenu: false,
    autoRefreshPayment: false
  }
}

const reducers = combineReducers({
  Snackbar,
  Auth,
  Cart,
  Dish,
  Bills,
  Settings
})

export default reducers;