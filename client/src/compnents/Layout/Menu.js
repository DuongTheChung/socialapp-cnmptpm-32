import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbal from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';


const isActive = () => {
    return {color: '#ffffff'}
}

const styles = theme => ({

  link:{
    textDecoration: 'none'
  },
})
class Menu extends Component {
  render() {
    const { classes }=this.props;
    return (
      <AppBar position="static">
        <Toolbal>
          <Typography type='title' color='inherit'>
              SOCIAL
          </Typography>
          <Link to="/" className={classes.link} >
            <IconButton aria-label="Home" style={isActive()} >
              <HomeIcon/>
            </IconButton>
          </Link>
          <Link to="/profile"  className={classes.link}>
            <Button style={isActive()}>
              MY PROFILE
            </Button>
          </Link>
          <Link to="/"  className={classes.link}>
            <Button style={isActive()}>
              SIGN OUT
            </Button>
          </Link>
        </Toolbal>
      </AppBar>
    );
  }
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Menu)