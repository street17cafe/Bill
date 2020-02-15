import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Home from '@material-ui/icons/Home'
import { Icon, IconButton } from '@material-ui/core';
import AuthService from '../../Services/AuthService'
import Person from '@material-ui/icons/Person'
import FolderSpecial from '@material-ui/icons/FolderSpecial'
import Restaurant from '@material-ui/icons/Restaurant'
import AttachMoney from '@material-ui/icons/AttachMoney'
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import ExitToApp from '@material-ui/icons/ExitToApp'
import Menu from '@material-ui/icons/Menu'

const drawerWidth = 240;

const navigation = [
  {
    label: "Home",
    path: "/frontend",
    icon: Home
  },
  {
    label: "Menu",
    path: "/frontend/menu",
    icon: Restaurant
  },
  {
    label: "Special",
    path: "/frontend/special",
    icon: FolderSpecial
  },
  {
    label: "Bill",
    path: "/frontend/bill",
    icon: AttachMoney
  },
  {
    label: "Previous Bills",
    path: "/frontend/previous",
    icon: ShoppingCart
  }
]

const auth = [
  {
    label: "Login",
    path: "/frontend/auth/login"
  },
  {
    label: "Register",
    path: "/frontend/auth/register"
  }
]

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: "100%"
  },
  appBar: {
    width: window.innerWidth > 1000 ? `calc(100% - ${drawerWidth}px)`:`100%`,
    marginLeft: window.innerWidth > 1000 ? drawerWidth : 0
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  icon: {
    fill: '#fff'
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  link: {
    color: '#000',
    textDecoration: 'none'
  },
  contain: {
    width:'100%'
  },
  headerText: {
    flex: 1
  }
}));


function Nav(props) {
  let [activeIndex, setActiveIndex] = useState(props.activeIndex)
  return(
    <List>
      {navigation.map((item, index) => (
        <Link key={item.label} to={item.path} className={props.classes.link} onClick={() => setActiveIndex(index)}>
          <ListItem button selected={activeIndex===index} onClick={props.onClick}>
            <ListItemIcon>{<Icon component={item.icon} />}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          </Link>
        ))}
    </List>
  )
}

export default function PermanentDrawerLeft(props) {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false)

  function renderAuth() {
    if(AuthService.isLoggedIn()){
      return (
        <React.Fragment>
          
          <ListItem button>
            <ListItemIcon><Person /></ListItemIcon>
            <ListItemText primary={AuthService.getUsername()} />
          </ListItem>
          
          <Link className={classes.link} to="/frontend/auth/logout">
            <ListItem button onClick={() => window.location.reload()}>
              <ListItemIcon><ExitToApp /></ListItemIcon>
              <ListItemText primary={'Logout'}/>
            </ListItem>
          </Link>
        </React.Fragment>
      )
    }
    return (
      auth.map((item, index) => (
        <Link key={item.label} to={item.path} className={classes.link}>
          <ListItem button>
            <ListItemIcon><Home /></ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        </Link>
      ))
    )
  }

  let activeIndex = 0;
  navigation.forEach((item, index) => {
    
    if(index === 0)
      return
    if(window.location.href.indexOf(item.path) !== -1){
      activeIndex = index
    }
  })

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton onClick={() => setDrawerOpen(true)}>
            <Menu className={classes.icon}/>
          </IconButton>
          <Typography variant="h6" noWrap className={classes.headerText}>
            Street 17
          </Typography>
          <Link to={process.env.REACT_APP_BASE_URL+"/cart"}>
            <IconButton>
              <ShoppingCart className={classes.icon} />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        open={drawerOpen}
        className={classes.drawer}
        variant={window.innerWidth > 1000 ? "permanent" : "temporary"}
        onClose={() => setDrawerOpen(false)}
        onOpen={() => setDrawerOpen(true)}
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <Nav classes={classes} activeIndex={activeIndex} onClick={() => setDrawerOpen(false)}/>
        <Divider />
        <List>
          {renderAuth()}
        </List>
      </SwipeableDrawer>
      <div className={classes.contain}>
        <div className={classes.toolbar} />
        {props.children}
      </div>
    </div>
  );
}