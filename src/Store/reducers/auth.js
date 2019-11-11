import { initialState } from './index'

const AuthReducer = (state = initialState.Auth, action) => {
  switch(action.type){
    case "AUTH::LOGIN":
      return {
        ...state,
        error: '',
        isChecking: true,
        username: action.data.username
      }

    
    case "AUTH::REGISTER": 
      return {
        isChecking: true,
        username: action.data.username,
        ...state
      }
    

    case "AUTH::LOGGEDIN":
      return {
        ...state,
        isChecking: false,
        token: action.data.token,
        error: '',
        isLoggedIn: true
      }
    
    case "AUTH::ERROR":
      return {
        ...state,
        isLoggedIn:false,
        isChecking: false,
        token: "",
        error: action.data.message
      }

    default:
      return state;
  }
}

export default AuthReducer