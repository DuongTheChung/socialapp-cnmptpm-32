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
import { Redirect } from 'react-router-dom'
import { signin } from '../Authentication/api-auth'
import auth from '../Authentication/auth-helper' 
import { Keypair } from 'stellar-base';
import { getDetail } from '../../actions/index';
import { connect } from 'react-redux';

const styles = theme => ({
  card: {
    maxWidth: 800,
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
    width: 600
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2
  }
})

class Signin extends Component {
  state = {
    privateKey: '',
    password: '',
    error: '',
    redirectToReferrer: false
}
checkKey=(key)=>{
  var data={};
  try{
      const key = Keypair.fromSecret(this.state.privateKey);
      const publicKey=key.publicKey();
      console.log(publicKey);
      data={
          publicKey:publicKey,
          status:true
      }
      return data;
  }catch(error){
      data={
          error:'Key-ID không chính xác',
          status:false
      }
      return data;
  }
}

clickSubmit = () => {
  const result=this.checkKey(this.state.privateKey);
  console.log(result);
  if(result.status){
    const user = {
      privateKey:this.state.privateKey || undefined,
      publicKey: result.publicKey  || undefined,
      password: this.state.password || undefined,
    }
    signin(user).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        auth.authenticate(data, () => {
          this.setState({redirectToReferrer: true});
          this.props.getDetail(data.user._id);
        })
      }
    })
  }else{
    return this.setState({ error:result.error })
  }
}

handleChange = name => event => {
  this.setState({[name]: event.target.value})
}
render() {

  const {classes} = this.props

  const {from} = this.props.location.state || {
    from: {
      pathname: '/'
    }
  }
  const {redirectToReferrer} = this.state
  if (redirectToReferrer) {
    return (<Redirect to={from}/>)
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography type="headline" component="h2" className={classes.title}>
          Sign In
        </Typography>
        <TextField id="privateKey" type="privateKey" label="ID-Key"  className={classes.textField} value={this.state.privateKey} onChange={this.handleChange('privateKey')} margin="normal"/><br/>
        <TextField id="password" type="password" label="Password" className={classes.textField} value={this.state.password} onChange={this.handleChange('password')} margin="normal"/>
        <br/> {
          this.state.error && (<Typography component="p" color="error">
            <Icon color="error" className={classes.error}>error</Icon>
            {this.state.error}
          </Typography>)
        }
      </CardContent>
      <CardActions>
        <Button color="primary" variant="raised" onClick={this.clickSubmit} className={classes.submit}>Submit</Button>
      </CardActions>
    </Card>
  )
}
}

Signin.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(null,{getDetail})(withStyles(styles)(Signin))
