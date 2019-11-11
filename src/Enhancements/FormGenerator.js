import React from 'react'
import PropTypes from 'prop-types'
import {TextField, FormControl, InputLabel, Select, MenuItem, Typography} from '@material-ui/core'
//automatically Generate Form component
//required

export default function RenderForm(props) {
  switch(props.type){
    case 'text':
    case 'textarea':
    case 'number':
      return(
        <TextField {...props}/>
      )  
    case 'select': 
      return <RenderSelect {...props} />
    case 'heading':
      return <Typography {...props}>{props.label}</Typography>
    default: 
      return (<div>Unrecognized component <b>{ props.type }</b></div>)
  }
}

function RenderSelect({className, ...props}){
  return(
    <FormControl fullWidth={props.fullWidth} className={className}>
      <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
      <Select
        {...props}
        inputProps={{
          ...props.inputProps
        }}
        >
        {
          props.options.map((option, index) => <MenuItem value={option.name || option} key={index}>{option.name || option}</MenuItem>)
        }
      </Select>
    </FormControl>
  )
}

RenderForm.propTypes = {
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string,

}