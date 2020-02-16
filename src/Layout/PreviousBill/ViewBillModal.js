import React from 'react'
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Divider, Grid, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Loading from '../../Enhancements/Loading'
import LoadingButton from '../../Enhancements/LoadingButton'
import { makeStyles } from '@material-ui/core/styles'
import RestaurantMenu from '@material-ui/icons/RestaurantMenu'


const makeText = item => {
  //console.log(item)
  return "Price: "+item.price+" Quanity: "+item.quantity+" Size: "+item.size
}

const useStyles = makeStyles(theme =>({
  row: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    padding: theme.spacing(2)
  },
  dishDetails: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 100
  },
  list: {
    width: '100%'
  }
}))

export const Row = props => (
  <Grid container className={props.classes.row}>
    <Grid item xs={7}>{props.label}</Grid>
    <Grid item xs={5}>₹ {props.value}</Grid>
  </Grid>
)

// function prepareData(data){
//   let obj = {id: 'fetching'}
//   if(data.items.length === 0)
//     return obj
//   console.log(data)
//   obj.id = data.bill[0].id
//   return obj;
// }

const Item = props => (
  <ListItem button>
    <ListItemIcon>
      <RestaurantMenu />
    </ListItemIcon>
    <ListItemText 
      primary={props.data.dish_name} 
      secondary={makeText(props.data)}
    />
  </ListItem>
)

export default function ViewBillModal(props){
  const classes = useStyles()
    if(!props.open) {
      return null
    }
    //let data = prepareData(props.details)
    return(
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Bill id: {props.bill.id}</DialogTitle>
        <DialogContent>
          
          <DialogContentText id="alert-dialog-description">
            Ordered Items
          </DialogContentText>
          <Grid container>    
            
            <Grid item xs={12} sm={6} className={classes.dishDetails}>
              <Loading isLoading={props.loading}>
                <List className={classes.list}>
                {
                  props.items.map((item, index) => 
                    <Item data={item} key={index} />
                  )
                }
                </List>
              </Loading>
            </Grid>  
            <Grid item xs={12} sm={6}>
              <Row classes={classes} label={'Amount'} value={props.bill.amount}/>
              <Row classes={classes} label={'Tax'} value={props.bill.tax}/>
              <Row classes={classes} label={'Total'} value={+props.bill.amount + +props.bill.tax}/>
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Close
          </Button>
          <LoadingButton isLoading={props.deleteRequest} onClick={props.handleSubmit} color="primary" autoFocus variant="contained">
            Push Items in Cart
          </LoadingButton>
        </DialogActions>
      </Dialog>
    ) 
  
}
