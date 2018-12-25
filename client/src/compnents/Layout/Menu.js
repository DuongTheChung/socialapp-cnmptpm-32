import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbal from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home'
import Button from '@material-ui/core/Button';
import { Link , withRouter } from 'react-router-dom';
import auth from '../Authentication/auth-helper';

const isActive = (history,path) => {
  if(history.location.pathname==path){
    return { color: '#ffa726' }
  }else{
    return {color: '#ffffff'}
  }
}

const Menu = withRouter(({history}) => (
  <AppBar position="static">
    <Toolbal>
      <Typography type="title" color="inherit">
        SOCIAL
      </Typography>
      <Link to="/">
        <IconButton aria-label="Home" style={isActive(history, "/")}>
          <HomeIcon/>
        </IconButton>
      </Link>
      {
        !auth.isAuthenticated() && (<span>
          <Link to="/signup">
            <Button style={isActive(history, "/signup")}>Sign up
            </Button>
          </Link>
          <Link to="/signin">
            <Button style={isActive(history, "/signin")}>Sign In
            </Button>
          </Link>
        </span>)
      }
      {
        auth.isAuthenticated() && (<span>
          <Link to={"/user/" + auth.isAuthenticated().user._id}>
            <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
          </Link>
          <Button color="inherit" onClick={() => {
              auth.signout(() => history.push('/'))
            }}>Sign out</Button>
        </span>)
      }
    </Toolbal>
  </AppBar>  
))

export default Menu;

