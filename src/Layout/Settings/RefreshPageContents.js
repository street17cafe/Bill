import React from 'react'
import { makeStyles } from '@material-ui/core'
import { connect }from 'react-redux'
import CustomList from 'Enhancements/CustomList'
import Refresh from '@material-ui/icons/Refresh'
import IconButton from '@material-ui/core/IconButton'
import { snackbarInfo } from 'Store/actions/snackbar'
import { fetchDishes } from '../../Store/actions/Dish'
import { fetchBills } from 'Store/actions/Bills'
import Menu from '@material-ui/icons/RestaurantMenu'
import AttachMoney from '@material-ui/icons/AttachMoney'
import Payment from '@material-ui/icons/Payment'

const styles = makeStyles(theme => ({
  root: {
    padding: 4,
    '& > *': {
      paddingBottom: 4
    }
  }
}))



function RefreshPageContent(props) {
  function refreshMenu(){
    props.fetchDishes();
    window.setTimeout(() => props.snackbarInfo("Menu reloaded"), 2000)
  }

  function fetchBills(){
    props.fetchBills()
    window.setTimeout(() => props.snackbarInfo("Fetched new bills"), 2000)
  }

  let items = [
    {
      id: 1,
      icon: <Menu />,
      primaryText: "Refresh Food Menu",
      secondaryIcon: <IconButton onClick={refreshMenu}><Refresh /></IconButton>
    },
    {
      id: 2,
      primaryText: "Refresh Payment methods",
      secondaryIcon: <IconButton><Refresh /></IconButton>,
      icon: <Payment />
    },
    {
      id: 3,
      primaryText: "Refresh all bills",
      secondaryIcon: <IconButton onClick={fetchBills}><Refresh /></IconButton>,
      icon: <AttachMoney />
    }
  ]
  return <CustomList items={items} heading={'Refresh Contents'} />
}

const mapDispatchToProps = dispatch => ({
  snackbarInfo: msg => dispatch(snackbarInfo(msg)),
  fetchDishes: data => fetchDishes(dispatch, data),
  fetchBills: () => fetchBills(dispatch),
})

export default connect(null, mapDispatchToProps)(RefreshPageContent); 