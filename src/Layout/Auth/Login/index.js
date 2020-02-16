import React, {useState} from 'react'
import { Grid, Paper, TextField, FormControl, Typography } from '@material-ui/core'
import LoadingButton from '../../../Enhancements/LoadingButton'
import { makeStyles } from '@material-ui/core/styles'
import { login } from '../../../Store/actions/auth'
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

function Login(props) {

  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')


  function onSubmit(e){
    e.preventDefault()
    console.log("Submission of form")
    props.login({
      username, password
    })
  }

  //console.log(props.Auth)

  const classes = styles()
  return (
    <Grid container className={classes.root}justify={'center'}>
      <Grid item>
        <Paper className={classes.paper} component={'form'} action={"/api/auth/login"} method="POST" onSubmit={onSubmit}>
          <Typography variant="h6" noWrap>
            Login
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
            <LoadingButton fullWidth isLoading={props.Auth.isChecking} type="submit" variant="contained" color="primary">Log in</LoadingButton>
          </FormControl>
        </Paper>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = state => ({
  Auth: state.Auth
})

const mapDispatchToProps = dispatch => ({
  login: (data) => login(dispatch, data)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)