import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import FindPeople from '../PeopleCanFollow/FindPeople'
import NewsFeed from '../Post/NewsFeed'
import seashellImg from '../../assets/images/home.jpg';
import auth from '../Authentication/auth-helper';
import { getDetail , getList } from '../../actions/index'
import { connect } from 'react-redux'


const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing.unit * 5
  },
  title: {
    padding:`${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme.spacing.unit * 2}px`,
    color: theme.palette.text.secondary
  },
  media: {
    minHeight: 330
  }
})

class Home extends Component {
  state = {
    defaultPage: true
  }
  init = () => {
    if(auth.isAuthenticated()){
      this.setState({defaultPage: false})
      const user={
        _id:auth.isAuthenticated().user._id,
        publicKeys:this.props.currentUser.followings
      }
      this.props.getList(user);
    }else{
      this.setState({defaultPage: true})
    }
  }
  componentWillReceiveProps = () => {
    this.init()
  }
  componentDidMount = () => {
    this.init()
  }

  render() {
    const { classes }=this.props;
    return (
      <div className={classes.root}>
         {this.state.defaultPage &&
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Card className={classes.card}>
                <Typography type="headline" component="h2" className={classes.title}>
                  Home Page
                </Typography>
                <CardMedia className={classes.media} image={seashellImg} title="Unicorn Shells"/>
                <CardContent>
                  <Typography type="body1" component="p">
                    Welcome to the MERN Social home page. 
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        }
        {!this.state.defaultPage &&
          <Grid container spacing={24}>
            <Grid item xs={8} sm={7}>
              <NewsFeed/>
            </Grid>
            <Grid item xs={6} sm={5}>
              <FindPeople />
            </Grid>
          </Grid>
        }
      </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}


const mapStateFromProps = state => ({
  currentUser:state.user.currentUser,
  list:state.user.listUser
});

export default connect(mapStateFromProps,{getDetail,getList})(withStyles(styles)(Home));
