import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './compnents/Home/Home'
import Menu from './compnents/Layout/Menu'
import Profile from './compnents/Account/Profile'
import Signin from './compnents/Authentication/Login'
import Signup from './compnents/Authentication/Register'
import EditProfile from './compnents/Account/EditProfile'
import { withRouter } from 'react-router';
import auth from './compnents/Authentication/auth-helper';
import { connect } from 'react-redux'

class MainRouter extends Component {
  componentDidMount=()=>{
    if(auth.isAuthenticated()){
      this.props.history.push('/');
    }
  }

  render() {
    return (<div>
      <Menu />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/signin" component={Signin}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/user/:userId" component={Profile}/>
        <Route  path="/editprofile" component={EditProfile}/>
      </Switch>
    </div>)
  }
}

export default withRouter(MainRouter);