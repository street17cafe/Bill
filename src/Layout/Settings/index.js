import React from 'react'
import { makeStyles } from '@material-ui/core'
import RefreshPageContents from './RefreshPageContents'
import ToggleSettings from './ToggleSettings'

const styles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    '& > *': {
      marginBottom: theme.spacing(1)
    }
  }
}))

function Settings(){
  const classes = styles()
  return (
    <div className={classes.root}>
      <ToggleSettings />
      <RefreshPageContents />
    </div>
  )
}

export default Settings