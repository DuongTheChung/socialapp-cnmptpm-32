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
import { connect } from 'react-redux'
import auth from '../Authentication/auth-helper';
import { getPost ,getList } from '../../actions/index';
import { getDetailApi } from '../../compnents/Account/api-user'
import { commit } from '../../compnents/Authentication/api-auth'
import { getDetail } from '../../actions/index'

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
  state={
    open:false,
    sequence:0,
    followMessage:'',
    list:[]
  }
  componentDidMount(){
    this.setState({ 
      list:this.props.list
     })
    getDetailApi(auth.isAuthenticated().user.publicKey)
    .then(data=>{
      if(data.error){
        console.log(data.error)
      }else{
        this.setState({ sequence:data.sequence })
      }
    })
  }

  clickFollow=(publicKey)=>{
    const tx={
      version:1,
      sequence:this.state.sequence,
      operation:'update_account',
      params:{
        key:'followings',
        addresses: publicKey
      }
    };
    const data={
      tx:tx,
      privateKey:auth.isAuthenticated().user.privateKey
    }
    commit(data).then(data=>{
      if(data.error){
        this.setState({
          open:true,
          followMessage:data.error
        })
      }else{
        this.setState({
          open:true,
          followMessage:data.msg
        })
      }
    })
  }

  handleRequestClose = (event, reason) => {
    this.setState({ open: false })
  }

  render() {
    const {classes , list} = this.props
    return (<div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Who to follow
        </Typography>
        <List>
        {list.map((item, i) => {
              return <span key={i}>
                <ListItem>
                  <ListItemAvatar className={classes.avatar}>
                      <Avatar src=""/>
                  </ListItemAvatar>
                  <ListItemText primary={item.name}/>
                  <ListItemSecondaryAction className={classes.follow}>
                    <Link to={"/user/" + item._id}>
                      <IconButton variant="raised" color="secondary" className={classes.viewButton}>
                        <ViewIcon/>
                      </IconButton>
                    </Link>
                    <Button aria-label="Follow" variant="raised" color="primary" onClick={this.clickFollow.bind(this,item.publicKey)} >
                      Follow
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              </span>
            })
          }
        </List>
      </Paper>

      <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.state.open}
          onClose={this.handleRequestClose}
          autoHideDuration={6000}
          message={<span className={classes.snack}>{this.state.followMessage}</span>}
      />
    </div>)
  }
}

FindPeople.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateFromProps = state => ({
    currentUser:state.user.currentUser,
    list:state.user.listUser
});


export default  connect(mapStateFromProps,null)(withStyles(styles)(FindPeople));