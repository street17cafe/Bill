import React from 'react'
import Loading from '../../Enhancements/Loading'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Edit from '@material-ui/icons/Edit'
import { addItem, emptyCart } from '../../Store/actions/Cart'
import { flipBillAutoRefresh } from '../../Store/actions/Settings'
import { connect } from 'react-redux'
import { fetchBills, fetchSpecific, deleteBill } from '../../Store/actions/Bills'
import { Table, TableCell, TableHead, TableBody, TableRow, Switch } from '@material-ui/core'
import Refresh from '@material-ui/icons/Refresh'
import ViewBillModal from './ViewBillModal'

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    minHeight: 100,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8
  },
  list: {
    position: 'relative',
    borderRadius: 4,
    overflow: 'hidden',
    width: '100%',
    backgroundColor: '#fff',
    boxShadow: theme.shadows[1]
  },
  settingsContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row"
  }
}))

function transformData(bills){
  return bills.map(bill => {
    let a = {id: bill.id}
    a.amount = +bill.amount + +bill.tax
    const t = bill.created_at.split(" ")[1]
    let timeParts = t.split(":")
    let meridian = "AM"
    let time = timeParts[0]
    if(+timeParts[0] > 12){
      time = +timeParts[0] - 12
      meridian = "PM"
    }
    a.time = time+":"+ timeParts[1] +" "+meridian
    return a
  })
}

// const BillsList = props => (
//   <List subheader={<ListSubheader>Previous Bills</ListSubheader>} className={props.classes.list}>
//     {
//       props.bills.map((bill, index) => 
//         <ListItem key={index}>
//           <ListItemIcon>
//             <span>{bill.id}</span>
//           </ListItemIcon>
//           <ListItemText primary={'₹'+bill.amount} secondary={bill.time}/>
//           <ListItemSecondaryAction>
//             <IconButton onClick={() => props.editBill(bill.id)}>
//               <Edit />
//             </IconButton>
//           </ListItemSecondaryAction>
//         </ListItem>
//       )
//     }
//   </List>
// )

const BillsLists = props => (
  <Table className={props.classes.list}>
    <caption>{props.bills.length === 0 ? "No bills receieved so far" :"All bills received today"}</caption>
    <TableHead>
      <TableRow>{props.head.map((item, index) => <TableCell key={index}>{item}</TableCell>)}</TableRow>
    </TableHead>
    <TableBody>
      {
        props.bills.map((bill, index) => 
          <TableRow key={index} hover>
            <TableCell>{bill.id}</TableCell>
            <TableCell>₹{bill.amount}</TableCell>
            <TableCell>{bill.time}</TableCell>
            <TableCell>
              <IconButton onClick={() => props.editBill(bill.id)}>
                <Edit />
              </IconButton>
            </TableCell>
          </TableRow>
        )
      }
    </TableBody>
  </Table>
)

const SettingsSection = props => (
  <Grid item xs={12} className={props.classes.settingsContainer}>
    <div>
      <span>Refresh</span>
      <IconButton onClick={props.refreshRequest}>
        <Refresh />
      </IconButton>
    </div>
    <div>
      <span>Auto refresh</span>
      <Switch checked={props.autoRefresh} onChange={props.switchChange}/>
    </div>
  </Grid>
)

function PreviousBill(props) {
  const classes = useStyles();
  let [modal, setModal] = React.useState({
    open:false,
    bill: {},
    deleteRequest: false
  })

  React.useEffect(() => {
    if(props.Bill.data.length < 1 || props.Settings.autoRefreshBills){
      props.fetchBills()
    }
  }, [])

  function editBill(id) {
    props.fetchSpecific(id)
    let bill = {}
    for(let i = 0; i < props.Bill.data.length; i++){
      if(props.Bill.data[i].id === id){
        bill = props.Bill.data[i]
        break;
      }
    }
    setModal({
      open:true,
      bill,
      deleteRequest: false
    })
    //console.log("Edit this bill")
  }

  function successDelete(){
    console.log("Successfully deleted")
    console.log(props);
    props.emptyCart()
    props.Bill.billItems.map(item => {
      console.log(item)
      props.addItem({
        id: new Date().getTime(),
        _id: item.item_id,
        size: item.size,
        price: item.price,
        quantity: item.quantity,
        name: item.dish_name
      })
      return null;
    })
    props.history.push(process.env.REACT_APP_BASE_URL+"/cart")
  }
  
  function handleSubmit() {
    //console.log("Bill is", modal.bill)
    //console.log("Items", props.Bill.billItems)
    if(!window.confirm("This will delete the current dish from Database. Also empty your cart and push this bill for modification")){
      return;
    }
    //push these items in cart
    //console.log(cartItems)
    props.deleteBill(modal.bill.id, successDelete)
  }

  let data = transformData(props.Bill.data)

  return (
    <Grid container className={classes.root}>
      
      <SettingsSection 
        autoRefresh={props.Settings.autoRefreshBills} 
        classes={classes}
        refreshRequest={() => props.fetchBills()}
        switchChange={() => props.flipBillAutoRefresh()}/>
       
      <Loading isLoading={props.Bill.isFetching}>
        <BillsLists head={['Id', 'Price', 'Time', 'Action']} 
        bills={data} 
        classes={classes} 
        editBill={editBill}
        />
      </Loading>
      {
        modal.open && <ViewBillModal open={modal.open} 
        items={props.Bill.billItems} 
        bill={modal.bill}
        handleClose={() => {setModal(false)}}
        handleSubmit={handleSubmit}
        loading={props.Bill.isFetchingSpecific}
        deleteRequest={props.Bill.deleteRequest}/>
      }
    </Grid>
  )
}

const mapStateToProps = state => ({
  Bill: state.Bills,
  Settings: state.Settings
})

const mapDispatchToProps = (dispatch) => ({
  fetchBills: () => fetchBills(dispatch),
  fetchSpecific: id => fetchSpecific(dispatch, id),
  addItem: data => dispatch(addItem(data)),
  emptyCart: () => dispatch(emptyCart()),
  deleteBill: (id, callback) => deleteBill(dispatch, id, callback),
  flipBillAutoRefresh: () => dispatch(flipBillAutoRefresh())
})

export default connect(mapStateToProps, mapDispatchToProps)(PreviousBill)