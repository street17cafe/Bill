import React, {useState} from 'react'
import { Grid, Paper, TextField, Button, FormControl, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { register } from '../../../Store/actions/auth'
import { connect } from 'react-redux'

const styles = makeStyles(theme => ({  
  root: {
    padding: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(1),
    width: '100%',
    '& > *': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  }
}))

function Register(props) {

  function onSubmit(e){
    e.preventDefault()
    console.log("Submission of form")
    props.register({
      username, password, location
    })
  }

  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')
  let [location, setLocation] = useState('')

  const classes = styles()
  return (
    <Grid container className={classes.root} justify={'center'}>
      <Grid item>
        <Paper className={classes.paper} component={'form'} action={"/api/auth/login"} method="POST" onSubmit={onSubmit}>
          <Typography variant="h6" noWrap>
            Register
          </Typography>
          <FormControl fullWidth>
            <TextField 
              label={'Username'}
              name={'username'}
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label={'Password'}
              name={'password'}
              type={'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label={'Location'}
              name={'location'}
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <Button type="submit" variant="contained" color="primary">Register</Button>
          </FormControl>
        </Paper>
      </Grid>
    </Grid>
  )
}

const mapDispatchToProps = dispatch => ({
  register: (data) => dispatch(dispatch => register(dispatch, data))
})

export default connect(null, mapDispatchToProps)(Register)