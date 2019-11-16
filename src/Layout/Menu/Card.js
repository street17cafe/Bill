import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add'

const useStyles = makeStyles({
  media: {
    height: 200,
  },
  icon:{
    fontSize: 16,
    marginRight: 8
  }
});

export default function MediaCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={"http://localhost:8000"+props.image}
          title="Contemplative Reptile"
          img={props.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" noWrap={true}>
            {props.label}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description.length > 100 ? props.description.substr(0, 97)+'...' : props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" variant="contained" onClick={() => props.addClick(props.id)}>
          <Add className={classes.icon}/> Add
        </Button>
        
      </CardActions>
    </Card>
  );
}