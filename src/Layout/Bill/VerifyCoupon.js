import React from 'react'
import TextField from '@material-ui/core/TextField'
import LoadingButton from '../../Enhancements/LoadingButton'
import { makeStyles } from '@material-ui/core/styles'
import API from '../../Services/API'
import ErrorUtil from '../../Services/ErrorHandler'
import {green, red, blue} from '@material-ui/core/colors'

const styles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  fieldsContainer: {
    display: 'flex',
    flexDirection: "row"
  },
  text: {
    flex: 1
  },
  redeemMessage: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1)
  },
  info: {
    backgroundColor: blue[100],
    color: blue[800],
    border: '1px solid '+blue[800]
  },
  success: {
    backgroundColor: green[100],
    color: green[800],
    border: '1px solid '+green[800]
  },
  error: {
    backgroundColor: red[100],
    border: '1px solid '+red[800],
    color: red[800]
  }
}))

function VerifyCoupon(props) {
  const classes = styles()
  let [value, setValue] = React.useState("")
  let [loading, setLoading] = React.useState(false);
  let [message, setMessage] = React.useState({type: "info", message: "Apply coupon to get discount"});

  function verifyVoucher(props) {
    setLoading(true)
    API('/api/vouchers/redeem', {voucherCode: value}, '', 'POST')
      .then(res => {
        setLoading(false)
        if(res.data.success){
          console.log(res.data)
          setMessage({type: "success", message: res.data.data.message})
        }
      })
      .catch(err => {
        setLoading(false)
        setMessage({type: "error", message: ErrorUtil(err)})
      })
  }

  return (
    <div className={classes.root}>
      <div className={classes.fieldsContainer}>
        <TextField label={'Coupon Code'} onChange={e => setValue(e.target.value)} value={value} className={classes.text}/>
        <LoadingButton isLoading={loading} variant="contained" color="primary" onClick={verifyVoucher}>Redeem</LoadingButton>
      </div>
      <div className={classes[message.type]+" "+classes.redeemMessage}>
        {message.message}
      </div>
    </div>
  )
}

export default VerifyCoupon;