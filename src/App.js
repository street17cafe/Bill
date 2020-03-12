import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid';
import { Provider } from 'react-redux'
import store from './Store'
import SnackBar from './Enhancements/SnackBar'
import { BrowserRouter } from 'react-router-dom'
import Layout from './Layout';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { connect } from 'react-redux'

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});
const lightTheme = createMuiTheme({
  palette: {
    type: 'light'
  }
})

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
          <Components />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

function _Components(props) {
  return (
    <ThemeProvider theme={props.dark ? darkTheme : lightTheme}>
      <Grid className="App" container>
        <Layout />
        <CssBaseline />
        <SnackBar />
      </Grid>
    </ThemeProvider>
  )
}

const mapStateToProps = state => ({
  dark: state.Settings.dark
})

const Components =  connect(mapStateToProps, null)(_Components)

export default App;
