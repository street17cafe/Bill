import React from 'react'
import Loading from '../../Enhancements/Loading'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import API from '../../Services/API'

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    minHeight: 400,
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

export default function PreviousBill(props) {
  const classes = useStyles();
  let [bill, setBill] = React.useState({
    isFetching: true,
  })

  React.useEffect(() => {
    
  }, [])

  return (
    <Grid container className={classes.root}>
      <Loading isLoading={bill.isFetching}>
        
      </Loading>
    </Grid>
  )
}
