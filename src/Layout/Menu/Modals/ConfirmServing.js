import React from 'react'
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Divider, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText, Grid, TextField} from '@material-ui/core';


const RadioGroupCustom = prop => {
  const { props } = prop;
  console.log("Serving", props.item.serving);
  return <FormControl component="fieldset">
  <FormLabel component="legend">Serving</FormLabel>
  <RadioGroup aria-label="serving" name="serving" value={props.value} onChange={e => props.onServingSizeChange(e)}>
    {
      props.item && 
      props.item.serving.map((item, index) => {
        let t = 'Regular'
        if(item.size === 'M') {
          t = 'Medium'
        }else if(item.size === 'L') {
          t = "Large"
        }
        return <FormControlLabel
          key={index}
          value={item.size}
          control={<Radio color="primary" />}
          label={t+' Rs.'+item.price}
          labelPlacement="end"
        />
      })
    }
  </RadioGroup>
  <FormHelperText>Select your serving</FormHelperText>
  </FormControl>
  }

export default function ConfirmServing(props){
    if(!props.open) {
      return (<div></div>)
    }
    return(
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.item.label}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.item && props.item.description}
          </DialogContentText>
          <Grid container>
            <Grid item xs={6}>
              <RadioGroupCustom props={props}/>
            </Grid>
            <Grid item xs={6}>
              <TextField label={'Quantity'} onChange={e => props.handleQuantityChange(e)} value={props.quantity}/>
            </Grid>
          </Grid>
          
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Close
          </Button>
          <Button onClick={props.handleSubmit} color="primary" autoFocus variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    ) 
  
}
