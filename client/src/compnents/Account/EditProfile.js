import React, {Component} from 'react'
import Card from  '@material-ui/core/Card'
import CardActions from  '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import ImageAva from '../../assets/images/ava2.jpg'
import { getDetailApi } from '../../compnents/Account/api-user'
import { commit } from '../../compnents/Authentication/api-auth'
import { connect } from 'react-redux'
import { Keypair } from 'stellar-base';
import auth from '../Authentication/auth-helper';

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 2
  },
  title: {
    margin: theme.spacing.unit * 2,
    color: theme.palette.protectedTitle
  },
  error: {
    verticalAlign: 'middle'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto'
  },
  input: {
    display: 'none'
  },
  filename:{
    marginLeft:'10px'
  }
})

class EditProfile extends Component {
  state={
    userId:'',
    name:'',
    redirectToProfile:false,
    sequence:0,
    error:'',
    open:false,
    privateKey:''
  }

  componentDidMount=()=>{
    const key = Keypair.fromSecret(auth.isAuthenticated().user.privateKey);
    const publicKey=key.publicKey();
    this.setState({ 
      userId:this.props.match.params.userId,
      privateKey:auth.isAuthenticated().user.privateKey
    })
    getDetailApi(publicKey)
    .then(data=>{
      if(data.error){
        console.log(data.error)
      }else{
        console.log(data);
        this.setState({ sequence:data.sequence })
      }
    })
  }


  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }

  clickSubmit=()=>{
    const tx={
      version:1,
      sequence:this.state.sequence,
      operation:'update_account',
      params:{
        key:'name',
        value: this.state.name
      }
    };
    const data={
      tx:tx,
      privateKey:this.state.privateKey
    }
    commit(data).then(data=>{
      if(data.error){
        console.log(data.error)
        this.setState({ error:data.error })
      }else{
        console.log(data);
        this.setState({ 
          redirectToProfile:true,
          open:true
        })
      }
    })
  }

  render() {
    const {classes} = this.props
    return (<div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            Edit Profile
          </Typography>
          <Avatar src={ImageAva} className={classes.bigAvatar}/><br/>
          <label htmlFor="icon-button-file">
            <Button variant="raised" color="default" component="span">
              Upload
            </Button>
          </label>
          <span className={classes.filename}>''</span><br/>
          <TextField 
            id="name" 
            label="Name" 
            className={classes.textField}
            value={this.state.name} 
            onChange={this.handleChange('name')}
          />
          <br/>
        </CardContent>
        <CardActions>
          <Button color="primary" variant="raised" onClick={this.clickSubmit}  className={classes.submit}>Submit</Button>
        </CardActions>
      </Card>
      <Dialog open={this.state.open} disableBackdropClick={true}>
        <DialogTitle>Update account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Updated Success
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to={'/user/' + this.state.userId}>
            <Button color="primary" autoFocus="autoFocus" variant="raised">
              Ok
            </Button>
          </Link>
        </DialogActions>
    </Dialog>
    </div>)
  }
}

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired
}


export default (withStyles(styles)(EditProfile))
