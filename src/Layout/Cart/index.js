import React from 'react'
import {connect} from 'react-redux'
import { List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, IconButton, Button } from '@material-ui/core'
import RestaurantMenu from '@material-ui/icons/RestaurantMenu'
import Close from '@material-ui/icons/Close'
import {makeStyles } from '@material-ui/core/styles'
import { removeItem } from '../../Store/actions/Cart'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1]
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(3)
  },
  buttonHolder: {
    flexDirection: 'row-reverse',
    display: 'flex'
  }
}));

const makeText = item => {
  return "Price: "+item.price+" Quanity: "+item.quantity+" Size: "+item.size
}

function Cart(props) {

  const classes = useStyles()
  console.log(props.Cart)
  return (
    <div className={classes.container}>
      <List className={classes.root}>
      {
        props.Cart.items.length === 0 ? 
        <ListItem>Cart is Empty Add Some Items</ListItem>
        :
        props.Cart.items.map(value => {
          const labelId = `checkbox-list-secondary-label-${value.id}`;
          return (
            <ListItem key={value.id} button>
              <ListItemIcon>
                <RestaurantMenu />
              </ListItemIcon>
              <ListItemText id={labelId} 
                primary={value.name} 
                secondary={makeText(value)}
                />

              <ListItemSecondaryAction>
                <IconButton onClick={() => { if(window.confirm('Do you wish to remove?'))props.removeItem(value.id)}}>
                  <Close />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })
      }
      <ListItem className={classes.buttonHolder}>
        <Button variant="contained" color="primary">Generate Bill</Button>
      </ListItem>
      </List>
    </div>
  )

}

const mapStateToProps = state => ({
  Cart: state.Cart
})

const mapDispatchToProps = dispatch => ({
  removeItem: id => dispatch(removeItem(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
