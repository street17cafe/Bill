import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons'
import { Link } from 'react-router-dom'

const styles = makeStyles(theme => ({
  root: {
    background: theme.palette.secondary.main,
    boxShadow: theme.shadows[2],
    height: 48,
    width: 48,
    borderRadius: '100%',
    position: 'fixed',
    right: 32,
    bottom: 32,
    zIndex: 100
  },
  button: {
    color: '#fff'
  }
}))

export default function Fab() {
  const classes = styles()
  return (
    <Link to={'/dish/add'} className={classes.root}>
      <IconButton className={classes.button}>
        <Add/>
      </IconButton>
    </Link>
  )
}

