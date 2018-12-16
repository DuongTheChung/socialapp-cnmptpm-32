import React, { Component } from 'react'
import MainRouter from './MainRouter'
import { BrowserRouter } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import {teal, orange} from '@material-ui/core/colors'
import { connect } from 'react-redux'
import auth from './compnents/Authentication/auth-helper'
 
// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
    light: '#52c7b8',
    main: '#009688',
    dark: '#00675b',
    contrastText: '#fff',
  },
  secondary: {
    light: '#ffd95b',
    main: '#ffa726',
    dark: '#c77800',
    contrastText: '#000',
  },
    openTitle: teal['700'],
    protectedTitle: orange['700'],
    type: 'light'
  }
})

class App extends Component{
  render(){
    return(
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <MainRouter/>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;