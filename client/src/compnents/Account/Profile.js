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
import Payment from '@material-ui/icons/Payment'
import Divider from '@material-ui/core/Divider'
import ProfileTabs from './ProfileTabs'
import { Link } from 'react-router-dom'
import ImageAva from '../../assets/images/ava2.jpg'
import { connect } from 'react-redux'
import auth from '../Authentication/auth-helper'
import { getDetail } from '../../actions/index'
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = theme => ({
  root: theme.mixins.gutters({
    maxWidth: 900,
    margin: 'auto',
    padding: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 5
  }),
  title: {
    margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit}px 0`,
    color: theme.palette.protectedTitle,
    fontSize: '1em'
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 10
  }
})

class Profile extends Component {
  state = {
    loading: true,
    completed: 0,
  };

  componentDidMount(){
    setTimeout(() => this.setState({ loading: false }), 1500);
    this.timer = setInterval(this.progress, 20);
    const userId=this.props.match.params.userId;
    this.props.getDetail(userId);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  render() {
    const { classes , currentUser }=this.props;
    const { loading } = this.state;
    return (
      <div>
        {loading &&
          <CircularProgress
            className={classes.progress}
            variant="determinate"
            value={this.state.completed}
          />
        }
        {!loading &&
        <Paper className={classes.root} elevation={4}>
          <Typography type="title" className={classes.title}>
            Profile
          </Typography>
          <List dense>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={ImageAva} className={classes.bigAvatar}/>
              </ListItemAvatar>
              <ListItemText primary={currentUser.name} />
              {auth.isAuthenticated().user._id===this.props.match.params.userId &&
              <ListItemSecondaryAction>
                  <Link to="/editprofile">
                      <IconButton aria-label="Edit" color="primary">
                          <Edit/>
                      </IconButton>
                  </Link>
                  <Link to={"/payment/" + this.props.match.params.userId}>
                      <IconButton aria-label="Edit" color="secondary">
                          <Payment/>
                      </IconButton>
                  </Link>
              </ListItemSecondaryAction>
              }
            </ListItem>
            <ListItem>
              <ListItemText primary={"Balance : "+currentUser.balance}/>
            </ListItem>
            <ListItem>
              <ListItemText primary={"Sequence : "+currentUser.sequence}/>
            </ListItem>
            <Divider/>
          </List>
        <ProfileTabs  />
        </Paper>
      }
    </div>
    )
  }
}
Profile.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateFromProps=(state)=>({
  currentUser:state.user.currentUser,
})


export default connect(mapStateFromProps,
      {getDetail})(withStyles(styles)(Profile))