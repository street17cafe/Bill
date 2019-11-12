import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid'
import Card from './Card'

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
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    paddingTop: theme.spacing(1),
    minWidth: 200
  },
  container: {
    flexGrow: 1,
    width: '100%',
    margin: 0
  },
  panel: {
    width: '100%'
  }
}));

export default function VerticalTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
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
              {
                group.items.map(dish => <Grid item xs={6} key={dish._id}>
                  <Card
                    image={dish.image}
                    description={dish.description}
                    name={dish.name}
                    id={dish._id}
                    addClick={(id) => props.addClick(index, id)}
                    deleteClick={props.deleteClick}
                  />
                </Grid>)
              }
            </Grid>
          </TabPanel>
        )
      }
    </div>
  );
}