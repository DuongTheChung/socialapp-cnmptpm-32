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
  render() {
    const { classes }=this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
            <Grid item xs={8} sm={7}>
              <NewsFeed/>
            </Grid>
            <Grid item xs={6} sm={5}>
              <FindPeople/>
            </Grid>
        </Grid>
      </div>
    )
  }
}


Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)