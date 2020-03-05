import React from 'react'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

export default function SelectMenu({options, ...props}){
  return (
    <Select {...props}>
      {
        options.map(option => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)
      }
    </Select>
  )
}