import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ImageAva from '../../assets/images/ava2.jpg'
import { getDetailApi } from '../../compnents/Account/api-user'
import { connect } from 'react-redux'

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit*2,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto'
  },
  gridList: {
    width: 500,
    height: 220,
  },
  tileText: {
    textAlign: 'center',
    marginTop: 10
  },
  link:{
    textDecoration: 'none'
  },
})

class FollowGrid extends Component {
  render() {
    const {classes ,  users } = this.props;
    console.log(users);
    return (
      <div className={classes.root}>
       <GridList cellHeight={160} className={classes.gridList} cols={4}>
       {users.map((person, i) => {
           return  <GridListTile style={{'height':120}} key={i}>
              <Link to={"/user/" + person._id}>
                <Avatar src={'/api/users/photo/'+person._id} className={classes.bigAvatar}/>
                <Typography className={classes.tileText}>{person}</Typography>
              </Link>
            </GridListTile>
        })}
      </GridList>
      </div>
    )
  }
}

FollowGrid.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(FollowGrid)