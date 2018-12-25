import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    link:{
        color:'blue'
    }
});

class Transactions extends Component {
  render() {
    const{ classes , currentUser }=this.props;
    console.log(currentUser.transactions);
    return (
        <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
                <TableCell align="right">Sequence</TableCell>
                <TableCell align="right">Account</TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">Operation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {currentUser.transactions.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell  align="right">
                  {row.sequence}
                </TableCell>
                <TableCell href="#" align="right" className={classes.link}>
                  {row.account}
                </TableCell>  
                <TableCell href="#" align="right" className={classes.link}>
                  {row.params.address}
                </TableCell>
                <TableCell align="right">{row.operation}</TableCell>     
              </TableRow>
            );
          })}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

Transactions.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateFromProps=(state)=>({
    currentUser:state.user.currentUser,
})
  
  
export default connect(mapStateFromProps,null)(withStyles(styles)(Transactions));