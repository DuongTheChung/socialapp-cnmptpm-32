import React, {Component} from 'react'
import Card from  '@material-ui/core/Card'
import CardActions from  '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ImageAva from '../../assets/images/ava2.jpg'

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
  render() {
    const {classes} = this.props
    return (
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
          <TextField id="name" label="Name" className={classes.textField} /><br/>
          <TextField
            id="multiline-flexible"
            label="About"
            multiline
            rows="2"
            className={classes.textField}
            margin="normal"
          /><br/>
          <TextField id="email" type="email" label="Email" className={classes.textField}  margin="normal"/><br/>
          <TextField id="password" type="password" label="Password" className={classes.textField}  margin="normal"/>
          <br/> 
        </CardContent>
        <CardActions>
          <Button color="primary" variant="raised"  className={classes.submit}>Submit</Button>
        </CardActions>
      </Card>
    )
  }
}

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditProfile)