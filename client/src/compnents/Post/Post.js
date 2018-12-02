import React, {Component} from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import FavoriteIcon from '@material-ui/icons/Favorite'
import CommentIcon from '@material-ui/icons/Comment'
import Divider from '@material-ui/core/Divider'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {Link} from 'react-router-dom'
import Comments from './Comments'
import ImageAva from '../../assets/images/ava2.jpg'

const styles = theme => ({
  card: {
    maxWidth:600,
    margin: 'auto',
    marginBottom: theme.spacing.unit*3,
    backgroundColor: 'rgba(0, 0, 0, 0.06)'
  },
  cardContent: {
    backgroundColor: 'white',
    padding: `${theme.spacing.unit*2}px 0px`
  },
  cardHeader: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  text: {
    margin: theme.spacing.unit*2
  },

  link:{
    textDecoration: 'none'
  },

  photo: {
    textAlign: 'center',
    backgroundColor: '#f2f5f4',
    padding:theme.spacing.unit
  },
  media: {
    height: 200
  },
  button: {
   margin: theme.spacing.unit,
  }
})

class Post extends Component {
  render() {
    const {classes} = this.props
    return (
      <Card className={classes.card}>
        <CardHeader
            avatar={
              <Avatar src={ImageAva}/>
            }
            action={
              <IconButton >
                <DeleteIcon />
              </IconButton>
            }
            title={<Link className={classes.link} to="">Name</Link>}
            subheader="One day ago"
            className={classes.cardHeader}
          />
          <CardContent className={classes.cardContent}>
          <Typography component="p" className={classes.text}>
              Text
          </Typography>
        </CardContent>
          <CardActions>
            <IconButton  className={classes.button} aria-label="Like" color="secondary">
                <FavoriteIcon />
              </IconButton><span>22</span>
            <IconButton className={classes.button} aria-label="Comment" color="secondary">
                <CommentIcon/>
            </IconButton> <span>22</span>
        </CardActions>
        <Divider/>
        <Comments />
      </Card>
    )
  }
}

Post.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Post)