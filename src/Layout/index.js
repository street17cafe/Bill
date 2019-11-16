import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Drawer from './Drawer'
import Auth from './Auth'
import ProtectedRoute from '../Enhancements/ProtectedRoute'
import Menu from './Menu'
import Cart from './Cart'
import Bill from './Bill'

const Layout = props => {
  return (
    <Drawer>
      <Switch>
        <Route path="/frontend/auth/:auth_action" component={Auth} />
        <ProtectedRoute path="/frontend/menu" component={Menu} />
        <ProtectedRoute path="/frontend/cart" component={Cart} />
        <ProtectedRoute path="/frontend/bill" component={Bill} />
      </Switch>
    </Drawer>
  )
}

export default Layout