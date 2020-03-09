export default function submitBill(items, donation=0, discount=0, flatDiscount = 0, props){
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
  if(paymentMethod === -1){
    props.snackbarWarning("Please select a payment method")
    return
  }
  if(discount > 100) {
    return props.snackbarWarning("Bro! Do the math. Discount can't be more than 100%")
  }
  setBillRequest(true)
  API('/api/bill', {items, donation, discount, paymentId: paymentMethod, voucher, flatDiscount}, '', 'POST')
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