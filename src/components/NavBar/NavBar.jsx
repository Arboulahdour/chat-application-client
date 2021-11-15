import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Raleway',
    paddingLeft: '15px',
    fontWeight: '800',
    letterSpacing: '2px',
    // background: '#7559FF',
    // background: '-webkit-linear-gradient(to right, #7559FF 31%, #AA72CF 57%)',
    // background: '-moz-linear-gradient(to right, #7559FF 31%, #AA72CF 57%)',
    background: 'linear-gradient(to right, #7559FF 31%, #21314f 57%, #AA72CF 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  navBarColor: {
    background: '#2c3049',
  },
  textFont: {
    fontFamily: 'Raleway',
  }
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.navBarColor}>
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
          <img height="40px" width="40px" src="https://img.icons8.com/external-icongeek26-outline-gradient-icongeek26/64/000000/external-chat-mobile-application-icongeek26-outline-gradient-icongeek26-1.png" style={{paddingBottom: '5px', marginRight: '7px'}}/>Chat<span style={{color: '#21314f'}}>In</span>
          </Typography>
          <div>
            {/* <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton> */}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}