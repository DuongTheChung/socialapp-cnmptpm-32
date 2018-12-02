import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar'
import ViewIcon from '@material-ui/icons/Visibility'
import ImageAva from '../../assets/images/ava2.jpg'

const styles = theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing.unit,
    margin: 0
  }),
  title: {
    margin: `${theme.spacing.unit * 3}px ${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    color: theme.palette.openTitle,
    fontSize: '1em'
  },
  avatar: {
    marginRight: theme.spacing.unit * 1
  },
  follow: {
    right: theme.spacing.unit * 2
  },
  snack: {
    color: theme.palette.protectedTitle
  },
  viewButton: {
    verticalAlign: 'middle'
  }
})
class FindPeople extends Component {
  render() {
    const {classes} = this.props
    return (<div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Who to follow
        </Typography>
        <List>
            <ListItem>
                <ListItemAvatar className={classes.avatar}>
                    <Avatar src={ImageAva}/>
                </ListItemAvatar>
                <ListItemText primary="People"/>
                <ListItemSecondaryAction className={classes.follow}>
                    <Link to="">
                      <IconButton variant="raised" color="secondary" className={classes.viewButton}>
                        <ViewIcon/>
                      </IconButton>
                    </Link>
                <Button aria-label="Follow" variant="raised" color="primary">
                    Follow
                </Button>
                </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
                <ListItemAvatar className={classes.avatar}>
                    <Avatar src={ImageAva}/>
                </ListItemAvatar>
                <ListItemText primary="People"/>
                <ListItemSecondaryAction className={classes.follow}>
                    <Link to="">
                      <IconButton variant="raised" color="secondary" className={classes.viewButton}>
                        <ViewIcon/>
                      </IconButton>
                    </Link>
                <Button aria-label="Follow" variant="raised" color="primary">
                    Follow
                </Button>
                </ListItemSecondaryAction>
            </ListItem>
        </List>
      </Paper>
      <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          autoHideDuration={6000}
          message={<span className={classes.snack}>Message</span>}
      />
    </div>)
  }
}

FindPeople.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(FindPeople)