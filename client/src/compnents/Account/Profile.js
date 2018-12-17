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
import { getCurrentUser , getBalanceAndSequence } from '../../actions/index'


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
  componentDidMount(){
    const userId=this.props.match.params.userId;
    this.props.getCurrentUser(userId,auth);
    this.props.getBalanceAndSequence(userId);
  }
  render() {
    const { classes , currentUser , privateKey }=this.props;
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
            <ListItemText primary={currentUser.name} />
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
          </ListItem>
          <ListItem>
            <ListItemText primary={"Balance : "+currentUser.balance}/>
          </ListItem>
          <ListItem>
            <ListItemText primary={"Sequence : "+currentUser.sequence}/>
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

const mapStateFromProps=(state)=>({
  currentUser:state.user.currentUser,
  privateKey:state.user.currentPrivateKey
})


export default connect(mapStateFromProps,
      {getCurrentUser,getBalanceAndSequence})(withStyles(styles)(Profile))