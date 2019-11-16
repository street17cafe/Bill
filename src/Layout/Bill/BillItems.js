import React from 'react'
import { TableRow, TableBody, TableCell, TableHead, Grid } from '@material-ui/core'

export const GenerateBody = props => {
  return (
    
      <TableBody>
        {
          props.body.map((row, index) => 
            <TableRow key={index}>
              <TableCell>{index+1}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">₹ {row.price}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">₹ {row.price * row.quantity}</TableCell>
            </TableRow>
          )
        }
      </TableBody>
    
  )
}


export const GenerateHead = props => (
  <TableHead>
    <TableRow>
      {
        props.head.map((item, index) => 
          <TableCell key={index} className={props.classes.head} align={index > 1 ? 'right': 'left'}>{item}</TableCell>
        )
      }
    </TableRow>
  </TableHead>
)


export const Row = props => (
  <Grid container className={props.classes.row}>
    <Grid item xs={7}>{props.label}</Grid>
    <Grid item xs={5}>₹ {props.value}</Grid>
  </Grid>
)