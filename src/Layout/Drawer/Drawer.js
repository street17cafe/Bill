import React from 'react'
import CustomList from '../../Enhancements/CustomList'
import { makeStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import Person from '@material-ui/icons/Person'
import { useHistory } from 'react-router-dom'
import FolderSpecial from '@material-ui/icons/FolderSpecial'
import Restaurant from '@material-ui/icons/Restaurant'
import AttachMoney from '@material-ui/icons/AttachMoney'
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import ExitToApp from '@material-ui/icons/ExitToApp'
import Home from '@material-ui/icons/Home'
import AuthService from '../../Services/AuthService'
import { logout } from '../../Store/actions/auth'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const drawerWidth = 240

const styles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
}))

const navigation = [
  {
    primaryText: "Home",
    path: process.env.REACT_APP_BASE_URL+"",
    icon: <Home />
  },
  {
    primaryText: "Menu",
    path: process.env.REACT_APP_BASE_URL+"/menu",
    icon: <Restaurant />
  },
  {
    primaryText: "Special",
    path: process.env.REACT_APP_BASE_URL+"/special",
    icon: <FolderSpecial />
  },
  {
    primaryText: "Bill",
    path: process.env.REACT_APP_BASE_URL+"/bill",
    icon: <AttachMoney />
  },
  {
    primaryText: "Previous Bills",
    path: process.env.REACT_APP_BASE_URL+"/previous",
    icon: <ShoppingCart />
  }
]

const authItems = {
  loggedIn: [ 
    {
      icon: <ExitToApp />,
      path: process.env.REACT_APP_BASE_URL+"/auth/logout",
      primaryText: "Logout"
    }
  ],
  loggedOut: [
    {
      icon: <Home />,
      path: process.env.REACT_APP_BASE_URL+"/auth/login",
      primaryText: "Login"
    }
  ]
}

function SideNav(props) {
  const classes = styles()
  let history = useHistory()

  function itemClick(item, index) {
    if(item.path.indexOf("logout") !== -1){
      props.logout()
      history.push(process.env.REACT_APP_BASE_URL+"/auth/login")
      return
    }
    if(activeIndex === index) {
      return
    }
    props.setDrawerOpen(false)
    history.push(item.path)
    //setActiveIndex(index)
  }

  function makeAuthList(items){
    if(AuthService.isLoggedIn()){
      return [
        {
          icon: <Person />,
          path: process.env.REACT_APP_BASE_URL+"/settings",
          primaryText: AuthService.getUsername()
        },
        ...items.loggedIn
      ]
    }else{
      return items.loggedOut
    }
  }
  function findActiveIndex(){
    let activeIndex = -1
    navigation.forEach((item, index) => {
      
      if(item.to === "/")
        return
      if(window.location.href.indexOf(item.path) !== -1){
        activeIndex = index
      }
    })
    return activeIndex;
  }
  let activeIndex = findActiveIndex()
  const authList = makeAuthList(authItems)

  return (
    <SwipeableDrawer
        open={props.drawerOpen}
        className={classes.drawer}
        variant={props.matches ? "permanent" : "temporary"}
        onClose={() => props.setDrawerOpen(false)}
        onOpen={() => props.setDrawerOpen(true)}
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
          <CustomList listClass={" "} items={navigation} button={true}  itemClick={itemClick} selected={[activeIndex]}/>
        <Divider />
        <CustomList items={authList} button={true} itemClick={itemClick} listClass={" "}/>
      </SwipeableDrawer>
  )
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout(dispatch))
})

export default withRouter(connect(null, mapDispatchToProps)(SideNav))