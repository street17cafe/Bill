import React from "react";
import { Snackbar, IconButton, SnackbarContent } from '@material-ui/core';
import {Close} from '@material-ui/icons'
import PropTypes from 'prop-types';
import {green, amber} from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { CheckCircle, Warning, Error, Info } from '@material-ui/icons'
import { closeSnackbar } from '../Store/actions/snackbar'

const variantIcon = {
  success: <CheckCircle />,
  warning: <Warning />,
  error: <Error />,
  info: <Info />,
};

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
    marginRight: theme.spacing(1)
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}))

const MySnackbarContentWrapper = (props) => {
  const classes = useStyles();
  const {variant} = props

  return (
    <SnackbarContent
      className={classes[variant]}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          {variantIcon[variant]}
          {props.message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="Close" color="inherit" onClick={props.onClose}>
          <Close />
        </IconButton>,
      ]}
    />
  )
}

const SnackBar = (props) => {
  //console.log("Snackbar props", props)
  return(
  <Snackbar
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    open={props.open}
    autoHideDuration={props.duration}
    onClose={props.handleClose}
  >
    <MySnackbarContentWrapper
      onClose={props.handleClose}
      variant={props.type}
      message={props.message}
    />
  </Snackbar>
);
}

SnackBar.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string,
  handleClose: PropTypes.func
}

const mapStateToProps = state => ({
  ...state.Snackbar
})

const mapDispatchToProps = dispatch => ({
  handleClose: () => dispatch(closeSnackbar())
})


export default connect(mapStateToProps, mapDispatchToProps)(SnackBar);