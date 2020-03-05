import React from 'react'
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Divider, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText, Grid, TextField} from '@material-ui/core';


const RadioGroupCustom = props => {
  //const { props } = prop;
  //console.log("Serving", props.item.serving);
  return <FormControl component="fieldset">
  <FormLabel component="legend">Serving</FormLabel>
  <RadioGroup aria-label="serving" name="serving" value={props.value} onChange={props.sizeChange}>
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
  let [size, setSize] = React.useState('R')
  let [quantity, setQuantity] = React.useState(1)
    if(!props.open) {
      return (<div></div>)
    }

  function handleSubmit(e){
    props.handleSubmit({size, quantity})
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
              <RadioGroupCustom {...props} sizeChange={e => setSize(e.target.value)} value={size}/>
            </Grid>
            <Grid item xs={6}>
              <TextField label={'Quantity'} onChange={e => setQuantity(e.target.value)} value={quantity}/>
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    ) 
  
}
