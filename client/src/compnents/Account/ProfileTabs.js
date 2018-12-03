import React, {Component} from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import FollowGrid from './FollowGrid'
import PostList from '../Post/PostList'
import { connect } from 'react-redux'

class ProfileTabs extends Component {
    state = {
        tab: 0,
        posts: []
      }
    
      componentWillReceiveProps = (props) => {
        this.setState({tab:0})
      }
      handleTabChange = (event, value) => {
        this.setState({ tab: value })
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
                    <Tab label="Following" />
                    <Tab label="Followers" />
                </Tabs>
                </AppBar>
            {this.state.tab === 0 && <TabContainer><PostList posts={this.props.posts} /></TabContainer>}
            {this.state.tab === 1 && <TabContainer><FollowGrid /></TabContainer>}
            {this.state.tab === 2 && <TabContainer><FollowGrid /></TabContainer>}
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
  posts: state.post.currentPosts
});

export default  connect(mapStateFromProps,null)(ProfileTabs)