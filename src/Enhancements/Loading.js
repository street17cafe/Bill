import React from 'react'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Loading(props){
  return (
    <React.Fragment>
      {
        props.isLoading ? <CircularProgress /> : props.children
      }
      
    </React.Fragment>
  )
}

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
}