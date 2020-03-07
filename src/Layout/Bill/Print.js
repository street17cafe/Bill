import React from 'react'
import {AmountSection} from './index'
import { GenerateHead } from './BillItems'
import Table from '@material-ui/core/Table'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import { TableRow, TableBody, TableCell } from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  heading: {
    fontWeight: "lighter",
    textTransform: "uppercase",
    wordSpacing: 4,
    textAlign: "center",
    paddingTop: 32,
  },
  bye: {
    textAlign: 'center',
    paddingTop: 4
  },
  address: {
    textAlign: 'center',
    padding: 8
  },
  time: {
    textAlign: "right",
    padding: 8,
    paddingBottom: 32
  },
  billId: {
    textAlign: 'center',
    fontSize: 24,
    margin: 0
  },
  container: {
    maxWidth: 320,
    display: "flex",
    flexDirection: "column"
  }
})

const Body = props => (
  <TableBody>
    {
      props.body.map((row, index) => 
        <TableRow key={index}>
          <TableCell>{row.name}</TableCell>
          <TableCell align="left">{row.quantity} * ₹{row.price}</TableCell>
          <TableCell align="right">₹ {row.price * row.quantity}</TableCell>
        </TableRow>
      )
    }
  </TableBody>
)

class PrintPage extends React.Component{
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Typography variant="h4" className={classes.heading}>Street 17 cafe</Typography>
        <p className={classes.address}>Street 17 cafe, Azad chowk, Rustumpur, Gorakhpur, Uttar pradesh - 270001</p>
        <p className={classes.billId}>Bill Id: {this.props.id}</p>
        <Divider />
        <Table>
          <GenerateHead head={['Item', 'Quantity', 'Price']} classes={this.props._classes}/>
          <Body body={this.props.items || []} />
        </Table>
        <AmountSection rows={this.props.rows} classes={this.props._classes}/>
        <Divider />
        <Typography variant="body1" className={classes.bye}>***Thank you visit again***</Typography>
        <p className={classes.time}>{ new Date().toLocaleDateString() }, {new Date().toLocaleTimeString()}</p>
      </div>
    )
  }
}

export default withStyles(styles)(PrintPage);