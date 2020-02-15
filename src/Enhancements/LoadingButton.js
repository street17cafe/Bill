import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonProgress: {
    position: 'absolute'
  },
}))

export default function _Button({isLoading, children, ...props}) {

  const classes = useStyles()

  return (
    <div className={classes.wrapper}>
      <Button {...props} disabled={isLoading}>{children}</Button>
      {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
    </div>
  )
}

_Button.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
}