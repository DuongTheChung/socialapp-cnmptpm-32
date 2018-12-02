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
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Edit from '@material-ui/icons/Edit'
import Divider from '@material-ui/core/Divider'
import ProfileTabs from './ProfileTabs'
import DeleteUser from './DeleteUser'
import { Link } from 'react-router-dom'
import ImageAva from '../../assets/images/ava2.jpg'

const styles = theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 5
  }),
  title: {
    margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit}px 0`,
    color: theme.palette.protectedTitle,
    fontSize: '1em'
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 10
  }
})

class Profile extends Component {
  render() {
    const { classes }=this.props;
    return (
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Profile
        </Typography>
        <List dense>
          <ListItem>
            <ListItemAvatar>
              <Avatar src={ImageAva} className={classes.bigAvatar}/>
            </ListItemAvatar>
            <ListItemText primary="chung" secondary="email"/>
            <ListItemSecondaryAction>
                <Link to="/editprofile">
                    <IconButton aria-label="Edit" color="primary">
                        <Edit/>
                    </IconButton>
                </Link>
              <DeleteUser/>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider/>
          <ListItem>
            <ListItemText secondary="Fri Nov 30 2018"/>
          </ListItem>
        </List>
       <ProfileTabs/>
      </Paper>
    )
  }
}
Profile.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Profile)