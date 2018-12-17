import React, {Component} from 'react'
import Card from  '@material-ui/core/Card'
import CardActions from  '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { Keypair } from 'stellar-base';
import { getBalanceAndSequenceApi } from '../../compnents/Account/api-user'
import { commit } from '../../compnents/Authentication/api-auth'
import {Link} from 'react-router-dom'
import Icon from '@material-ui/core/Icon'

const styles = theme => ({
  card: {
    maxWidth: 800,
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
    width: 600
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

class Payment extends Component {

  state={
    userId:'',
    address:'',
    amount:0,
    redirectToProfile:false,
    sequence:0,
    error:'',
    open:false
  }

  handleChange = name => event => {

    this.setState({[name]: event.target.value})
  }

  componentDidMount=()=>{
    const key = Keypair.fromSecret(this.props.privateKey);
    const publicKey=key.publicKey();
    this.setState({ userId:this.props.match.params.userId })
    getBalanceAndSequenceApi(publicKey)
    .then(data=>{
      if(data.error){
        console.log(data.error)
      }else{
        console.log(data);
        this.setState({ sequence:data.sequence })
      }
    })
  }

  clickSubmit=()=>{

      const amountFm=Number.parseInt(this.state.amount);
      const tx={
        version:1,
        sequence:this.state.sequence,
        operation:'payment',
        params:{
          address:this.state.address,
          amount: amountFm
        }
      };
      const data={
        tx:tx,
        privateKey:this.props.privateKey
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
    const {classes } = this.props
    return (<div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
           Payment
          </Typography>
            <TextField 
              id="address" 
              label="Address" 
              className={classes.textField}
              value={this.state.address} 
              onChange={this.handleChange('address')}
            />
          <br/>
          <br/>
            <TextField 
              id="amount" 
              label="Amount" 
              className={classes.textField}  
              margin="normal"
              value={this.state.amount} 
              onChange={this.handleChange('amount')}
            />
          <br/>
          <br/> {
            this.state.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {this.state.error}</Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="raised" onClick={this.clickSubmit}  className={classes.submit}>Submit</Button>
        </CardActions>
      </Card>
      <Dialog open={this.state.open} disableBackdropClick={true}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Payment Success
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

Payment.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateFromProps=(state)=>({
  privateKey:state.user.currentPrivateKey
});

export default connect(mapStateFromProps,null)(withStyles(styles)(Payment))