import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Drawer from './Drawer'
import Auth from './Auth'
import ProtectedRoute from '../Enhancements/ProtectedRoute'

const Layout = props => {
  return (
    <Drawer>
      <Switch>
        <Route path="/auth/:auth_action" component={Auth} />
      </Switch>
    </Drawer>
  )
}

export default Layout