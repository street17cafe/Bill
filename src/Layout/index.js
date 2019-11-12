import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Drawer from './Drawer'
import Auth from './Auth'
import ProtectedRoute from '../Enhancements/ProtectedRoute'
import Menu from './Menu'

const Layout = props => {
  return (
    <Drawer>
      <Switch>
        <Route path="/auth/:auth_action" component={Auth} />
        <ProtectedRoute path="/menu" component={Menu} />
      </Switch>
    </Drawer>
  )
}

export default Layout