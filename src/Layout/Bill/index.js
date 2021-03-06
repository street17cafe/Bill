import React, {useState} from 'react'
import {connect} from 'react-redux'
import { Table, Grid, Divider, Typography, TextField, InputAdornment } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { GenerateBody, GenerateHead, Row } from './BillItems'
import API from '../../Services/API'
import ReactToPrint from 'react-to-print'
import LoadingButton from '../../Enhancements/LoadingButton'
import SelectMenu from '../../Enhancements/SelectMenu'
import { snackbarSuccess, snackbarError, snackbarWarning } from '../../Store/actions/snackbar'
import { emptyCart } from '../../Store/actions/Cart'
import { withRouter } from 'react-router-dom'
import PrintBill from './Print'
import VerifyCoupon from './VerifyCoupon'
import ErrorUtil from '../../Services/ErrorHandler'

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


function calculateTotal(data, donation=0, discount=0, flatDiscount=0){
  let total = 0
  if(isNaN(flatDiscount))
    flatDiscount = 0
  if(isNaN(donation))
    donation = 0
  if(isNaN(discount))
    discount = 0
  if(data === undefined || data.length === 0)
    return []
  data.forEach(item => total+=(item.price * item.quantity))
  total-=flatDiscount
  if(total < 0) {
    total = 0
  }
  //console.log( Math.round(2 * total * 2.5)/100 + donation - (Math.round(total * discount)/100), total, donation, (Math.round(total * discount)/100))
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
      label: 'Flat discount',
      value: flatDiscount
    },
    {
      label: 'Total',
      value: Math.round((total + (2 * total * 0.025) + donation - (total * discount/100))*100)/100
    }
  ])
}

export const AmountSection = props => (
  <React.Fragment>
    <Typography variant="h5" className={props.classes.row}>Amount</Typography>
      {
        props.rows.map((item, index) => 
          <React.Fragment  key={index}>
            <Row label={item.label} value={item.value} classes={props.classes}/>
            <Divider />
          </React.Fragment>
        )
      }
  </React.Fragment>
)

function PaymentMethod(props) {
  let [options, setOptions] = React.useState([])
  React.useEffect(() => {
    API('/api/payment', '', '', 'GET')
      .then(res => {
        if(res.data.success){
          //console.log(res.data)
          let data = [{value: 0, label: "Select a payment method"}, ...res.data.data.message.map(item => ({value: item.id, label: item.label}))]
          setOptions(data)
          return
        }
        throw new Error("Unable to fetch Payment")
      })
      .catch(err => {
        console.log(err.response)
      })
  }, [])

  return (
    <div>
      <SelectMenu value={props.value} options={options} fullWidth onChange={props.onChange}/>
    </div>
  )
}

const BillTable = React.memo(({classes, items, ...props}) => {
  return (
    <Table className={classes.table}>
      <caption>Dishes selected for the order</caption>
      <GenerateHead head={['Sl no', 'Dish', 'Price', 'Quanity', 'Total']} classes={classes}/>
      <GenerateBody body={items}/>
    </Table>
  )
})

function Bill(props) {
  let [billId, setBillId] = useState(-1)
  let [billRequest, setBillRequest] = useState(false)
  let [donation, setDonation] = useState(0)
  let [discount, setDiscount] = useState(0)
  let [voucher, setVoucher] = useState("")
  let [paymentMethod, setPaymentMethod] = useState(0)
  let [flatDiscount, setFlatDiscount] = useState(0)
  const classes = useStyles()
  const rows = calculateTotal(props.Cart.items, parseInt(donation), parseInt(discount), flatDiscount)
  const printBillRef = React.useRef()

  function submitBill(items, donation=0, discount=0){
    if(isNaN(donation))
      donation = 0
    if(isNaN(discount))
      discount = 0
    if(isNaN(flatDiscount))
      flatDiscount = 0
    if(flatDiscount > 0  && discount > 0){
      props.snackbarWarning("You can't have discount and flat off. Use just one offer")
      return
    }
    if(paymentMethod === 0){
      props.snackbarWarning("Please select a payment method")
      return
    }
    if(discount > 100) {
      return props.snackbarWarning("Bro! Do the math. Discount can't be more than 100%")
    }
    setBillRequest(true)
    API('/api/bill', {items, donation, discount, paymentId: paymentMethod, voucherCode: voucher, flatDiscount}, '', 'POST')
      .then(res => {
        //console.log(res.data, res.data.success)
        if(res.data.success){
          setBillId(res.data.data.message.id)
          setBillRequest(false)
          document.querySelector("#print").click()
          props.emptyCart()
          props.snackbarSuccess("Bill submitted")
          props.history.push(process.env.REACT_APP_BASE_URL+'/menu')  
        }
        //console.log(res.data)
      })
      .catch(err => {
          //console.log(err.response)
        setBillRequest(false)
        props.snackbarError(ErrorUtil(err))
      })
  }


  return (
    <Grid container spacing={2} className={classes.container}>
      <Grid item xs={12} sm={8}>
        <div className={classes.root}>
          <BillTable classes={classes} items={props.Cart.items} />
          <Grid container>
            
            <Grid item xs={12} sm={6} className={classes.row}>
              <TextField 
                label={'Flat discount'} 
                type="number" 
                fullWidth 
                value={flatDiscount}
                onChange={(e) => setFlatDiscount(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      ₹
                    </InputAdornment>
                  ),
                }}
                />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.row}>
              <TextField 
                label={'Discount percentage'} 
                type="number" 
                fullWidth 
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      %
                    </InputAdornment>
                  ),
                }}
                />
            </Grid>
            <Grid item xs={12} className={classes.row}>
              <PaymentMethod value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}/>
            </Grid>
            <Grid item xs={12} className={classes.row}>
              <VerifyCoupon update={val => setVoucher(val)} />
            </Grid>
            <Grid item xs={12} className={classes.row}>
              <TextField 
                label={'Wish to donate for a cause'} 
                type="number" 
                fullWidth 
                value={donation}
                onChange={(e) => setDonation(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      ₹
                    </InputAdornment>
                  ),
                }}
                />
            </Grid>
          </Grid>
        </div>
      </Grid>
      <Grid item sm={4} xs={12}>
        <div className={classes.root}>
          <AmountSection classes={classes} rows={rows} />
          <div className={classes.row}>
            <LoadingButton 
              isLoading={billRequest} 
              fullWidth 
              variant="contained" 
              color="primary" 
              onClick={() => submitBill(props.Cart.items, donation, discount, flatDiscount)}>Print Bill</LoadingButton>
            <ReactToPrint 
              trigger={() => <button id="print" style={{display:"none"}}></button>}
              content={() => printBillRef.current}
            />
          </div>
        </div>
      </Grid>
      <div style={{display: "none"}}>
        <PrintBill ref={printBillRef} rows={rows} _classes={classes} items={props.Cart.items} id={billId}/>
      </div>
    </Grid>
  )

}

const mapStateToProps = state => ({
  Cart: state.Cart
})

const mapDispatchToProps = dispatch => ({
  emptyCart: () => dispatch(emptyCart()),
  snackbarSuccess: (msg) => dispatch(snackbarSuccess(msg)),
  snackbarError: (msg) => dispatch(snackbarError(msg)),
  snackbarWarning: (msg) => dispatch(snackbarWarning(msg))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Bill))
