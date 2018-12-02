import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './compnents/Home/Home'
import Menu from './compnents/Layout/Menu'
import Profile from './compnents/Account/Profile'
import EditProfile from './compnents/Account/EditProfile'

class MainRouter extends Component {
  render() {
    return (<div>
      <Menu/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route  path="/profile" component={Profile}/>
        <Route  path="/editprofile" component={EditProfile}/>
      </Switch>
    </div>)
  }
}

export default MainRouter