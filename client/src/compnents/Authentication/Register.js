import React, {Component} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {Link} from 'react-router-dom'
import { create } from './api-auth'
import { Keypair}  from 'stellar-base'
import { publicKeySame,secretKeySame } from '../../same-key'
import { getDetailApi } from '../../compnents/Account/api-user'
import { commit } from '../../compnents/Authentication/api-auth'

const key = Keypair.random();

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 2
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2
  }
})

class Signup extends Component {
  state = {
      name: '',
      password: '',
      email: '',
      open: false,
      privateKey:"",
      sequence:0,
      error: ''
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }

  componentDidMount(){
    getDetailApi(publicKeySame)
    .then(data=>{
      if(data.error){
        console.log(data.error)
      }else{
        console.log(data);
        this.setState({ sequence:data.sequence })
      }
    })
  }


  clickSubmit = () => {
    const publicKey=key.publicKey();
    const secretKey=key.secret();
    const user = {
      name: this.state.name || undefined,
      email: this.state.email || undefined,
      password: this.state.password || undefined,
      publicKey:publicKey || undefined,
    }

    const tx={
      version:1,
      sequence:this.state.sequence,
      operation:'create_account',
      params:{
        address:user.publicKey
      }};
    
      const data={
        tx:tx,
        privateKey:secretKeySame
      }
    commit(data).then(data=>{
      if(data.error){
        console.log(data.error);
        this.setState({error: data.error})
      }else{
        getDetailApi(publicKeySame)
        .then(data2=>{
          if(data.error){
            console.log(data2.error)
          }else{
            const tx={
              version:1,
              sequence:data2.sequence,
              operation:'payment',
              params:{
                address:user.publicKey,
                amount: 10000000
              }
            };
            const data={
              tx:tx,
              privateKey:secretKeySame
            }
            commit(data).then(data=>{
              if(data.error){
                console.log(data.error);
                this.setState({error: data.error})
              }else{
                getDetailApi(user.publicKey)
                .then(data2=>{
                  if(data.error){
                    console.log(data2.error)
                  }else{
                    const tx={
                      version:1,
                      sequence:data2.sequence,
                      operation:'update_account',
                      params:{
                        key:'name',
                        value: this.state.name
                      }
                    };
                    const data={
                      tx:tx,
                      privateKey:secretKey
                    }
                  commit(data).then(data=>{
                    if(data.error){
                      console.log(data.error);
                      this.setState({error: data.error})
                    }else{
                      create(user).then((data)=>{
                        if(data.error){
                          console.log(data.error);
                          this.setState({ error:data.error })
                        }else{
                          console.log(data);
                          this.setState({
                            error: '', 
                            open: true,
                            privateKey:secretKey
                        })
                      }
                    });
                    }
                });
              }
            })
          }
        });
      }
    });
  }});
}


  render() {
    const {classes} = this.props
    return (<div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            Sign Up
          </Typography>
          <TextField id="name" label="Name" className={classes.textField} value={this.state.name} onChange={this.handleChange('name')} margin="normal"/><br/>
          <TextField id="email" type="email" label="Email" className={classes.textField} value={this.state.email} onChange={this.handleChange('email')} margin="normal"/><br/>
          <TextField id="password" type="password" label="Password" className={classes.textField} value={this.state.password} onChange={this.handleChange('password')} margin="normal"/>
          <br/> {
            this.state.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {this.state.error}</Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="raised" onClick={this.clickSubmit} className={classes.submit}>Submit</Button>
        </CardActions>
      </Card>
      <Dialog open={this.state.open} disableBackdropClick={true}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Successfully created.Login with ID:{this.state.privateKey}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/signin">
            <Button color="primary" autoFocus="autoFocus" variant="raised">
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>)
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Signup)
