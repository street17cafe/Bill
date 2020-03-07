import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import Badge from '@material-ui/core/Badge'
import Menu from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const drawerWidth = 240;

const styles  = makeStyles(theme => ({
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    }
  },
  headerText: {
    flex: 1
  },
  icon: {
    color: "#fff"
  }
}))

function _DishesCart(props){
  return (
    <Link to={process.env.REACT_APP_BASE_URL+"/cart"}>    
      <IconButton>
        <Badge color={"secondary"} badgeContent={props.Cart.items.length}>
          <ShoppingCart className={props.classes.icon} />
        </Badge>
      </IconButton>
    </Link>
  )
}
const mapCartStateToProps = state => ({
  Cart: state.Cart
})
let DishesCart = connect(mapCartStateToProps, null)(_DishesCart)

function _AppBar(props){

  const classes = styles()

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton onClick={() => props.setDrawerOpen(true)} className={classes.menuButton}>
          <Menu className={classes.icon}/>
        </IconButton>
        <Typography variant="h6" noWrap className={classes.headerText}>
          Street 17
        </Typography>
        <DishesCart classes={classes}/>
      </Toolbar>
    </AppBar>
  )
}

export default _AppBar