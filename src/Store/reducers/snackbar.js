import { initialState } from './index'

const SnackbarReducer = (state = initialState.Snackbar, action) => {
  switch(action.type){
    case 'SNACKBAR::SUCCESS':
      return {
        ...state,
        open: true,
        message: action.message,
        type: 'success'
      }
    case 'SNACKBAR::ERROR':
      return {
        ...state,
        open: true,
        message: action.message,
        type: 'error'
      }
    case 'SNACKBAR::WARNING':
      return {
        ...state,
        open: true,
        message: action.message,
        type: 'warning'
      }
    case 'SNACKBAR::INFO':
      return {
        ...state,
        open: true,
        message: action.message,
        type: 'info'
      }
    case 'SNACKBAR::CLOSE':
      return {
        ...state,
        open: false,
        message: ''
      }
    default:
      return state
  }
}

export default SnackbarReducer