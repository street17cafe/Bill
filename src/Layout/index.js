import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Drawer from './Drawer'
import Auth from './Auth'
import ProtectedRoute from '../Enhancements/ProtectedRoute'
import Menu from './Menu'
import Cart from './Cart'
import Home from './Home'
import Bill from './Bill'
import PreviousBill from './PreviousBill'

const Layout = props => {
  return (
    <Drawer>
      <Switch>
        <Route path={process.env.REACT_APP_BASE_URL+"/auth/:auth_action"} component={Auth} />
        <ProtectedRoute path={process.env.REACT_APP_BASE_URL+"/menu"} component={Menu} />
        <ProtectedRoute path={process.env.REACT_APP_BASE_URL+"/cart"} component={Cart} />
        <ProtectedRoute path={process.env.REACT_APP_BASE_URL+"/bill"} component={Bill} />
        <ProtectedRoute path={process.env.REACT_APP_BASE_URL+"/previous"} component={PreviousBill} />
        <ProtectedRoute path={process.env.REACT_APP_BASE_URL+"/"} component={Home} exact/>
      </Switch>
    </Drawer>
  )
}

export default Layout