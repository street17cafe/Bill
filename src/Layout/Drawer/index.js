import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Drawer from './Drawer'
import AppBar from './AppBar';
import Hidden from '@material-ui/core/Hidden'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: "100%"
  },
  toolbar: theme.mixins.toolbar,
  container: {
    width: "100%"
  }
}));


function AppNavigation(props){
  const matches = useMediaQuery('(min-width:960px)')
  const [drawerOpen, setDrawerOpen] = useState(false)
  return <React.Fragment>
    <AppBar position="fixed" setDrawerOpen={setDrawerOpen}/>
    <Drawer setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen} matches={matches}/>
  </React.Fragment>
}

export default function PermanentDrawerLeft(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppNavigation />
      <div className={classes.container}>
        <div className={classes.toolbar} />
          {props.children}
        <Hidden smUp> 
          <div className={classes.toolbar} /> 
          {/* <BottomNavigation value={'home'} className={classes.bottom}>
          <BottomNavigationAction label={'Home'} value={'home'} icon={<Home />}/>
          <BottomNavigationAction label={'Menu'} value={'menu'} icon={<Restaurant />}/>
          <BottomNavigationAction label={'Bills'} value={'money'} icon={<AttachMoney />}/>
          <BottomNavigationAction label={'Previous bill'} value={'shoppingcart'} icon={<ShoppingCart />}/>
          </BottomNavigation> */}
        </Hidden>
      </div>
      
    </div>
  );
}