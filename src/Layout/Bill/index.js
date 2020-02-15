import React, {useState} from 'react'
import {connect} from 'react-redux'
import { Table, Grid, Divider, Typography, Button, TextField, InputAdornment } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { GenerateBody, GenerateHead, Row } from './BillItems'
import API from '../../Services/API'
import { snackbarSuccess, snackbarError } from '../../Store/actions/snackbar'
import { emptyCart } from '../../Store/actions/Cart'
import { withRouter } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    position: 'relative',
    overflow: "auto"
  },
  container: {
    flexGrow: 1,
    width: '100%',
    margin: 0
  },
  buttonHolder: {
    flexDirection: 'row-reverse',
    display: 'flex'
  },
  head: {
    fontWeight: 400,
    textTransform: 'uppercase',
  },
  row: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    padding: theme.spacing(2)
  },
  table: {
    width: '100%',
    overflow: 'auto'
  }
}));




function calculateTotal(data, donation=0, discount=0){
  let total = 0
  if(isNaN(donation))
    donation = 0
  if(isNaN(discount))
    discount = 0
  if(data === undefined || data.length === 0)
    return []
  data.forEach(item => total+=(item.price * item.quantity))
  console.log( Math.round(2 * total * 2.5)/100 + donation - (Math.round(total * discount)/100), total, donation, (Math.round(total * discount)/100))
  return ([
    {
      label: 'SubTotal',
      value: total
    },
    {
      label: 'CGST 2.5%',
      value: Math.round(total * 2.5)/100
    },
    {
      label: 'SGST 2.5%',
      value: Math.round(total * 2.5) / 100
    },
    {
      label: 'Donation',
      value: donation
    },
    {
      label: 'Discount',
      value: discount+'%'
    },
    {
      label: 'Total',
      value: Math.round((total + (2 * total * 0.025) + donation - (total * discount/100))*100)/100
    }
  ])
}

function submitBill(items, donation=0, discount=0, props){
  if(isNaN(donation))
    donation = 0
  if(isNaN(discount))
    discount = 0
  console.log(items);
  API('/api/bill', {items, donation, discount}, '', 'POST')
    .then(res => {
      console.log(res.data, res.data.success)
      if(res.data.success){
        props.emptyCart()
        props.snackbarSuccess("Bill submitted")
        props.history.push('/frontend/menu')
      }
      console.log(res.data)
    })
    .catch(err => {
      console.log(err.response)
      props.snackbarError("Unable to save dish")
    })
}

function Bill(props) {

  let [donation, setDonation] = useState(0)
  let [discount, setDiscount] = useState(0)
  const classes = useStyles()
  const rows = calculateTotal(props.Cart.items, parseInt(donation), parseInt(discount))

  return (
    <Grid container spacing={2} className={classes.container}>
      <Grid item xs={12} sm={8}>
        <div className={classes.root}>
          <Table className={classes.table}>
          <caption>Dishes selected for the order</caption>
            <GenerateHead head={['Sl no', 'Dish', 'Price', 'Quanity', 'Total']} classes={classes}/>
            <GenerateBody body={props.Cart.items}/>
          </Table>
          <div className={classes.row}>
            <TextField 
              label={'Wish to donate for a cause'} 
              type="number" 
              fullWidth 
              value={donation} 
              autoFocus={true}
              onChange={(e) => setDonation(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    ₹
                  </InputAdornment>
                ),
              }}
              />
          </div>
          <div className={classes.row}>
            <TextField 
              label={'Discount percentage'} 
              type="number" 
              fullWidth 
              value={discount} 
              autoFocus={true}
              onChange={(e) => setDiscount(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    %
                  </InputAdornment>
                ),
              }}
              />
          </div>
        </div>
      </Grid>
      <Grid item sm={4} xs={12}>
        <div className={classes.root}>
          <Typography variant="h5" className={classes.row}>Amount</Typography>
          {
            rows.map((item, index) => 
            <React.Fragment  key={index}>
              <Row label={item.label} value={item.value} classes={classes}/>
              <Divider />
            </React.Fragment>
            )
          }
          <div className={classes.row}>
            <Button fullWidth variant="contained" color="primary" onClick={() => submitBill(props.Cart.items, donation, discount, props)}>Print Bill</Button>
          </div>
        </div>
      </Grid>
    </Grid>
  )

}

const mapStateToProps = state => ({
  Cart: state.Cart
})

const mapDispatchToProps = dispatch => ({
  emptyCart: () => dispatch(emptyCart()),
  snackbarSuccess: (msg) => dispatch(snackbarSuccess(msg)),
  snackbarError: (msg) => dispatch(snackbarError(msg))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Bill))
