import React from 'react'
import PropTypes from 'prop-types'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
//import { createMuiTheme } from '@material-ui/core/styles'


const styles = makeStyles(theme => ({
  paperStyle: {
    background: theme.palette.background.paper,
    position: 'relative',
    borderRadius: 4,
    overflow: 'hidden',
    boxShadow: theme.shadows[1]
  }
}))

function _List({items, ...props}){
  const classes = styles()
  //console.log(createMuiTheme())
  function divider(con, length, index){
    if(con && index < length - 1 ){
      return <Divider />
    }else{
      return null
    }
  }

  return (
    <List className={props.listClass || classes.paperStyle} subheader={<ListSubheader>{props.heading || ''}</ListSubheader>}>
      {
        items.map((item, index) => <React.Fragment key={item.id}>
          <ListItem className={props.itemClass || ''} button={props.button} onClick={() => props.itemClick(item, index)} selected={props.selected.indexOf(item.id) !== -1}>
            {
              item.icon && <ListItemIcon>{item.icon}</ListItemIcon>
            }
            <ListItemText primary={item.primaryText} secondary={item.secondaryText || ''}/>
            {
              item.secondaryIcon && <ListItemSecondaryAction>{item.secondaryIcon}</ListItemSecondaryAction>
            }
          </ListItem>
          { divider(props.divider, items.length, index)}
          </React.Fragment>
        )
      }
    </List>
  )
}

_List.propTypes = {
  items: PropTypes.array.isRequired,
  listClass: PropTypes.string,
  itemClick: PropTypes.func,
  button: PropTypes.bool,
  itemClass: PropTypes.string,
  selected: PropTypes.array
}

_List.defaultProps = {
  button: false,
  itemClick: () => {},
  selected: []
}

export default _List