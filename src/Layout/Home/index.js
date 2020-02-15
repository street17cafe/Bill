import React, {useEffect, useState} from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Kitchen from '@material-ui/icons/Kitchen'
import AttachMoney from '@material-ui/icons/AttachMoney'
import Fastfood from '@material-ui/icons/Fastfood'
import { connect } from 'react-redux'
import { fetchBills } from '../../Store/actions/Bills'
import Loading from '../../Enhancements/Loading'

const useStyles = makeStyles(theme => ({
  root:{
    width: '100%',
    margin: 0,
    justifyContent: 'center',
    minHeight: 100,
    alignItems: 'center'
  },
  paper: {
    padding: theme.spacing(1)
  }
}))

function transformData(bills){
  let obj = {count: bills.length, amount: 0, tax: 0, categories: mockCategory}
  for(let i = 0; i < bills.length; i++){
    //console.log(bills[i])
    obj.amount+= +bills[i].amount;
    obj.tax+= +bills[i].tax
  }
  return obj
}

const RenderBillsCard = props => (
  <Paper className={props.classes.paper}>
    <List subheader={<ListSubheader>Bills generated today</ListSubheader>}>
      <ListItem>
        <ListItemIcon>
        <Kitchen />
        </ListItemIcon>
        <ListItemText primary={'Total orders placed'} secondary={props.bill.count}/>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <AttachMoney />
        </ListItemIcon>
        <ListItemText primary={'Total amount'} secondary={props.bill.amount}/>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <AttachMoney />
        </ListItemIcon>
        <ListItemText primary={'Total tax'} secondary={props.bill.tax}/>
      </ListItem>
    </List>
  </Paper>
)

//which category items were order. Would help in keeping the inventory in check
const RenderOrderItemsCountCard = props => (
  <Paper>
    <List subheader={<ListSubheader>Items sold today</ListSubheader>}>
      {
        props.items.map((item, index) => <ListItem key={index} button>
          <ListItemIcon>
            <Fastfood/>
          </ListItemIcon>
          <ListItemText primary={item.category} secondary={item.count}/>
        </ListItem>)
      }
    </List>
  </Paper>
)

const mockCategory = [
  {
    category: "Beverage",
    count: 23
  },
  {
    category: "Burgers",
    count: 22
  },
  {
    category: "Pizza",
    count: 12
  },
  {
    category: "Main course",
    count: 32
  }
]


function Home(props){

  const classes = useStyles()
  // let [bill, setBill] = useState({
  //   count: 0,
  //   amount: 0,
  //   tax: 0,
  //   categories: mockCategory
  // })

  useEffect(() => {
    if(props.Bill.data.length === 0){
      props.fetchBills()
    }
  }, [])

  let bill = transformData(props.Bill.data)

  console.log(bill)
  return (
    <Grid container spacing={2} className={classes.root}>
      <Loading isLoading={props.Bill.isFetching}>
        <Grid item xs={12} md={6}>
          <RenderBillsCard bill={bill} classes={classes}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <RenderOrderItemsCountCard items={bill.categories}/>
        </Grid>
      </Loading>
    </Grid>
  )

}

const mapStateToProps = state => ({
  Bill: state.Bills
})

const mapDispatchToProps = (dispatch) => ({
  fetchBills: () => fetchBills(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)