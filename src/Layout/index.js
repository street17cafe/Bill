import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Drawer from './Drawer'
import Auth from './Auth'
import ProtectedRoute from '../Enhancements/ProtectedRoute'
import Menu from './Menu'
import Cart from './Cart'

const Layout = props => {
  return (
    <Drawer>
      <Switch>
        <Route path="/auth/:auth_action" component={Auth} />
        <ProtectedRoute path="/menu" component={Menu} />
        <ProtectedRoute path="/cart" component={Cart} />
      </Switch>
    </Drawer>
  )
}

export default Layout