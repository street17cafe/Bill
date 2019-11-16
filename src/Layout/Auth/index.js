import React from  'react'
import Login from './Login'
import Register from './Register'
import {Route, Redirect, withRouter} from 'react-router-dom'
import AuthService from '../../Services/AuthService'
import {connect} from 'react-redux'
import { snackbarSuccess } from '../../Store/actions/snackbar'

const Logout = (props) => {
  console.log(props)
  AuthService.logOut()
  props.snackbarSuccess("Logged out sucesfully")
  return <Redirect to={'/frontend/auth/login'} />
}

function Auth(props){ 
  if(AuthService.isLoggedIn() && props.match.params.auth_action !== 'logout'){
    return <Redirect to={'/frontend'}/>
  }
  return (
    <React.Fragment>
      <Route path="/frontend/auth/login" component={Login} />
      <Route path="/frontend/auth/register" component={Register} />
      <Route path="/frontend/auth/logout" component={() => <Logout snackbarSuccess={props.snackbarSuccess} />} />
    </React.Fragment>
  )
}

const mapDispatchToProps = dispatch => ({
  snackbarSuccess: message => dispatch(snackbarSuccess(message))
})


export default withRouter(connect(null, mapDispatchToProps)(Auth))