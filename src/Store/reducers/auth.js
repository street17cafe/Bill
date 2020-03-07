import { initialState } from './index'

const AuthReducer = (state = initialState.Auth, action) => {
  switch(action.type){

    case "AUTH::LOGIN_REQUEST":
      return {
        ...state,
        isRequesting: true
      }
    
    case "AUTH::LOGIN_SUCCESS":
      return {
        ...state,
        isRequesting: false,
        token: action.token,
        username: action.username
      }
    
    case "AUTH::LOGIN_FAIL":
      return {
        ...state,
        isRequesting: false,
        error: true
      }

    case "AUTH::LOGOUT":
      return {
        ...state,
        token: '',
        username: ''
      }

    default: 
      return state

  }
}

export default AuthReducer