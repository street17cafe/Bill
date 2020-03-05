import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid'
import Card from './Card'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Fastfood from '@material-ui/icons/Fastfood'
import Add from '@material-ui/icons/Add'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import IconButton from '@material-ui/core/IconButton'
import Refresh from '@material-ui/icons/Refresh'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Tooltip from '@material-ui/core/Tooltip'
import Switch from '@material-ui/core/Switch'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 'calc(100vh - 64px)',
    width: "100%",
    flexDirection: window.innerWidth > 500 ? "row": "column",
    padding: 0
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    paddingTop: theme.spacing(1),
    minWidth: 200
  },
  container: {
    flexGrow: 1,
    width: '100%',
    margin: 0,
  },
  panel: {
    width: '100%',
    overflow: 'auto',
    '&> div': {
      padding: window.innerWidth > 500 ? 24 : 8, 
    }
  },
  list: {
    width: '100%',
    boxShadow: theme.shadows[1],
    backgroundColor: "#fff",
    borderRadius: 8,
    position: "relative",
    overflow: "hidden"
  },
  switchContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    backgroundColor: "#fff",
    alignItems: "center",
    paddingRight: 16,
    justifyContent: "space-between"
  }
}));

const ImagesSwitch = props =>{
  const classes = useStyles()
  return (
  <Grid item xs={12} className={classes.switchContainer}>
    <div>
      <span>Refresh</span>
      <IconButton onClick={props.refreshMenu}>
        <Refresh />
      </IconButton>
    </div>
    <div>
      <span>Render Images</span>
      <Tooltip title={'Disable for slow network'}>
        <Switch onClick={props.onClick} checked={props.checked}/>
      </Tooltip>
    </div>
  </Grid>
  )
}

function RenderDishDetails(props){
  const classes = useStyles()
  //prop.renderImages: required
  if(props.renderImages === undefined){
    return null;
  }
  if(props.renderImages) {
    return (
      <React.Fragment>
        {
          props.dishes.map(dish => 
            <Grid item xs={12} sm={6} key={dish.id}>
              <Card
                image={dish.image}
                description={dish.description}
                name={dish.label}
                id={dish.id}
                addClick={id => props.addClick(id)}
                deleteClick={props.deleteClick}
              />
            </Grid>
          )
        }
      </React.Fragment>
    )
  }else {
    return (
      <List className={classes.list}>
        {
          props.dishes.map(dish => 
            <ListItem button key={dish.id}>
              <ListItemIcon>
                <Fastfood />
              </ListItemIcon>
              <ListItemText primary={dish.label} secondary={dish.description.substr(0, 64)+'...'}/>
              <ListItemSecondaryAction>
                <IconButton onClick={e => props.addClick(dish.id)}>
                  <Add />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )
        }
      </List>
    )
  }
}

export default React.memo((props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <Tabs
        orientation={window.innerWidth < 500 ? "horizontal": "vertical"}
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs Menu"
        className={classes.tabs}
      >
        {
          props.data.map((group, index) => <Tab label={group.heading} {...a11yProps(index)} key={index}/>)
        } 
      </Tabs>
      {
        props.data.map((group, index) => 
          <TabPanel value={value} index={index} key={index} className={classes.panel}>
            <Grid container spacing={1} className={classes.container}>
              <ImagesSwitch checked={props.renderImages} onClick={props.flipRender} refreshMenu={props.refreshMenu}/>
              <RenderDishDetails 
                dishes={group.items} 
                addClick={id => props.addClick(index, id)}
                renderImages={props.renderImages}/>
            </Grid>
          </TabPanel>
        )
      }
    </div>
  );
})