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
  return <Redirect to={'/auth/login'} />
}

function Auth(props){ 
  if(AuthService.isLoggedIn() && props.match.params.auth_action !== 'logout'){
    return <Redirect to={'/'}/>
  }
  return (
    <React.Fragment>
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/register" component={Register} />
      <Route path="/auth/logout" component={() => <Logout snackbarSuccess={props.snackbarSuccess} />} />
    </React.Fragment>
  )
}

const mapDispatchToProps = dispatch => ({
  snackbarSuccess: message => dispatch(snackbarSuccess(message))
})


export default withRouter(connect(null, mapDispatchToProps)(Auth))