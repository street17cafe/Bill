
const Auth = {

  isLoggedIn: () => {
    let auth = JSON.parse(localStorage.getItem('auth'))
    if(auth === null || !auth.isLoggedIn){
      return false
    }
    return true
  },

  logUserIn: data => {

    localStorage.setItem('auth', JSON.stringify(data))
    window.location = process.env.REACT_APP_BASE_URL

  },

  logOut: () => {
    localStorage.removeItem('auth')
  },

  getToken: () => {
    let auth = JSON.parse(localStorage.getItem('auth'))
    if(auth === null || !auth.isLoggedIn){
      return ''
    }
    return auth.token
  },

  getUsername: () => {
    let auth = JSON.parse(localStorage.getItem('auth'))
    if(auth === null || !auth.isLoggedIn){
      return ''
    }
    return auth.username
  }

}

export default Auth