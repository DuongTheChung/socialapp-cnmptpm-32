
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Post from './Post'

class PostList extends Component {
  render() {
    return (
      <div style={{marginTop: '24px'}}>
        <Post/>
      </div>
    )
  }
}
export default PostList