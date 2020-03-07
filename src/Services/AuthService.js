import store from '../Store'


const Auth = {

  isLoggedIn: () => {
    let token = store.getState().Auth.token
    if(token === ''){
      return false
    }
    return true
  },

  logUserIn: data => {
    //let history = useHistory()
    //localStorage.setItem('auth', JSON.stringify(data))
    //history.push(process.env.REACT_APP_URL)

  },

  logOut: () => {
    localStorage.removeItem('auth')
  },

  getToken: () => {
    return store.getState().Auth.token
  },

  getUsername: () => {
    return store.getState().Auth.username
  }

}

export default Auth