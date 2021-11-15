import React, { useState } from 'react';
// import { Link } from "react-router-dom";
// import { Link as LinkScroll, animateScroll as scroll } from "react-scroll";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Modal from "react-bootstrap/Modal";

// import "bootstrap/dist/css/bootstrap.min.css";

/*import Link from '@material-ui/core/Link';
*/

import 'react-notifications-component/dist/theme.css';

// import { store } from 'react-notifications-component';

import 'animate.css/animate.min.css';

import { connect } from 'react-redux'
import { roomCreateAction } from '../../exports'

import NavBar from '../../components/NavBar/NavBar';

import HomeForm from './HomeForm';

const copyrightStyle = makeStyles(() => ({
    fontStyle: {
      fontFamily: 'Raleway',
      color: 'white'
    }
  }));

// const scrollToTop = () => {
//       scroll.scrollToTop();
//   };

function Copyright() {
  const classe = copyrightStyle();
  
  return (
    <Typography variant="body2" align="center" className={classe.fontStyle}>
      {'Copyright © '}
      <a color="inherit" href="https://chatino.netlify.app/">
        chatIn
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  mainPage: {
    backgroundColor: '#1e2334',
  },
  headerContent: {
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: '#1e2334',
    padding: theme.spacing(8,0,12),
    // paddingTop: '120px',
    // marginBottom: '-60px',
    fontFamily: 'Raleway',
    color: 'white',
  },
  headerTitle: {
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    // background: '#7559FF',
    // background: '-webkit-linear-gradient(to right, #7559FF 31%, #AA72CF 57%)',
    // background: '-moz-linear-gradient(to right, #7559FF 31%, #AA72CF 57%)',
    background: 'linear-gradient(to right, #7559FF 31%, #AA72CF 57%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '1.3px',
  },
  headerDescription: {
    marginTop: theme.spacing(3),
    fontFamily: 'Raleway',
    fontWeight: '600',
    letterSpacing: '1.2px',
    // background: '#3879CF',
    // background: '-webkit-linear-gradient(to right, #3879CF 31%, #3E51CF 57%)',
    // background: '-moz-linear-gradient(to right, #3879CF 31%, #3E51CF 57%)',
    background: 'linear-gradient(to right, #3879CF 31%, #3E51CF 57%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  headerButtons: {
    marginTop: theme.spacing(5),
    fontFamily: 'Raleway',
  },
  buttonMainStyle: {
    fontFamily: 'Raleway',
    backgroundColor: '#614983',
    padding: '10px',
    paddingLeft: '19px',
    paddingRight: '19px',
  },
  buttonStyle: {
    fontFamily: 'Raleway',
    padding: '8.5px',
    paddingLeft: '15px',
    paddingRight: '15px',
    backgroundColor: '#375bff',
    color: 'white',
  },
  paper: {
    backgroundColor: '#2c3049',
    border: '1px solid #1e2334',
    color: 'white',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  footer: {
    backgroundColor: '#2c3049',
    color: 'white',
    fontFamily: 'Raleway',
    padding: theme.spacing(3, 2, 2),
  },
  footerText: {
    fontFamily: 'Raleway',
  },
}));

function Home(props) {

  const classes = useStyles();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar />
      <main className={classes.mainPage} style={{ minHeight: '100vh' }}>
        {/* Header unit */}
        <div className={classes.headerContent}>
          <Container maxWidth="md">
            <br/><br/><br/>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom className={classes.headerTitle}>
              Welcome To ChatIn
            </Typography> 
            <Typography variant="h5" align="center" color="textSecondary" paragraph className={classes.headerDescription}>
              Join our real time chat application community to collaborate, share files, images and videos with your
              favorite friends or with strangers.
            </Typography>
            <div className={classes.headerButtons}> 
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" className={classes.buttonMainStyle} onClick={handleShow}>
                    Create your room
                  </Button>
                </Grid>
                {/* <Grid item>
                  <Button variant="outlined" color="primary" className={classes.buttonStyle}>
                    <LinkScroll to="rooms" smooth={true} style={{color: 'white'}}>Join a room</LinkScroll>
                  </Button>
                </Grid> */}
              </Grid>
            </div>
          </Container>
        </div>

        <Modal 
          show={show} 
          onHide={handleClose} 
          animation={true}
          contentClassName="modal-border-radius"
          // backdrop="static"
        >
          <Modal.Header className="modal-form" closeButton>
            <Modal.Title>New Chat Room 💬</Modal.Title>
          </Modal.Header> 
          <Modal.Body className="modal-body-style">
              <HomeForm />
          </Modal.Body>
      </Modal>

      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom className={classes.footerText}>
          <Copyright />
        </Typography>      
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}


const mapStateToProps = state => {
  return {
    name: state.name,
    room: state.room,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    roomCreateAction: (name,room) => dispatch(roomCreateAction(name,room))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)