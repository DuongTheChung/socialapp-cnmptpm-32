import React, { Component } from 'react'
import CardHeader from '@material-ui/core/CardHeader'
import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import ImageAva from '../../assets/images/ava2.jpg'

const styles = theme => ({
  cardHeader: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  smallAvatar: {
    width: 25,
    height: 25
  },
  commentField: {
    width: '96%'
  },
  commentText: {
    backgroundColor: 'white',
    padding: theme.spacing.unit,
    margin: `2px ${theme.spacing.unit*2}px 2px 2px`
  },
  commentDate: {
    display: 'block',
    color: 'gray',
    fontSize: '0.8em'
 },
 link:{
    textDecoration: 'none',
    color:'blue'
  },
 commentDelete: {
   fontSize: '1.6em',
   verticalAlign: 'middle',
   cursor: 'pointer'
 }
})

class Comments extends Component {
  render() {
    const {classes} = this.props
    const commentBody = item => {
      return (
        <p className={classes.commentText}>
          <Link to={"/"} className={classes.link}>{item}</Link><br/>
          Comment
          <span className={classes.commentDate}>
              One day ago
          </span>
        </p>
      )
    }

    return (<div>
        <CardHeader
              avatar={
                <Avatar className={classes.smallAvatar} src={ImageAva}/>
              }
              title={ <TextField
                multiline
                placeholder="Write something ..."
                className={classes.commentField}
                margin="normal"
                />}
              className={classes.cardHeader}
        />
        <CardHeader
          avatar={
            <Avatar className={classes.smallAvatar} src={ImageAva}/>
          }
          title={commentBody("comment1")}
          className={classes.cardHeader}
        />
         <CardHeader
          avatar={
            <Avatar className={classes.smallAvatar} src={ImageAva}/>
          }
          title={commentBody("comment2")}
          className={classes.cardHeader}
        />  
    </div>)
  }
}

Comments.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Comments)