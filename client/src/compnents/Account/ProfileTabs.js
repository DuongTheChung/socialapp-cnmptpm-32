import React, {Component} from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import FollowGrid from './FollowGrid'
import PostList from '../Post/PostList'
import { connect } from 'react-redux'
import Transactions from './Transactions'
import { getDetailApi } from '../../compnents/Account/api-user'

class ProfileTabs extends Component {
    state = {
        tab: 0,
        posts: [],
        followings:[]
      }
    
      componentWillReceiveProps = (props) => {
        this.setState({tab:0})
      }
      handleTabChange = (event, value) => {
        this.setState({ tab: value })
      }
      componentDidMount=()=>{
        var a=[];
        this.props.currentUser.followings.forEach(element => {
          getDetailApi(element).then(data=>{
            if(data.error){
              console.log(data.error)
            }else{
              if(data.name !== "")
                a.push(data.name);
            }
          })
        });
        console.log(a);
        this.setState({ followings:a });
      }
    render() {
        return (
            <div>
                <AppBar position="static" color="default">
                <Tabs
                    value={this.state.tab}
                    onChange={this.handleTabChange}
                    onChange={this.handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    fullWidth
                >
                    <Tab label="Posts" />
                    <Tab label="Followings" />
                    <Tab label="Transaction"/>
                </Tabs>
                </AppBar>
            {this.state.tab === 0 && <TabContainer><PostList posts={this.props.posts} /></TabContainer>}
            {this.state.tab === 1 && <TabContainer><FollowGrid users={this.state.followings} /></TabContainer>}
            {this.state.tab === 2 && <TabContainer><Transactions /></TabContainer>}
        </div>)
  }
}

const TabContainer = (props) => {
  return (
    <Typography component="div" style={{ padding: 8 * 2 }}>
      {props.children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
}

const mapStateFromProps = state => ({
  posts: state.post.currentPosts,
  currentUser:state.user.currentUser
})

export default  connect(mapStateFromProps,null)(ProfileTabs)