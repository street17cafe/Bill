import React from  'react'
import Login from './Login'
import Register from './Register'
import {Route, Redirect, withRouter} from 'react-router-dom'
import AuthService from '../../Services/AuthService'
import {connect} from 'react-redux'
import { snackbarSuccess } from '../../Store/actions/snackbar'

const Logout = (props) => {
  AuthService.logOut()
  props.snackbarSuccess("Logged out sucesfully")
  return <Redirect to={process.env.REACT_APP_BASE_URL+'/auth/login'} />
}

function Auth(props){ 
  if(AuthService.isLoggedIn() && props.match.params.auth_action !== 'logout'){
    return <Redirect to={process.env.REACT_APP_BASE_URL}/>
  }
  return (
    <React.Fragment>
      <Route path={process.env.REACT_APP_BASE_URL+"/auth/login"} component={Login} />
      <Route path={process.env.REACT_APP_BASE_URL+"/auth/register"} component={Register} />
      <Route path={process.env.REACT_APP_BASE_URL+"/auth/logout"} component={() => <Logout snackbarSuccess={props.snackbarSuccess} />} />
    </React.Fragment>
  )
}

const mapDispatchToProps = dispatch => ({
  snackbarSuccess: message => dispatch(snackbarSuccess(message))
})


export default withRouter(connect(null, mapDispatchToProps)(Auth))