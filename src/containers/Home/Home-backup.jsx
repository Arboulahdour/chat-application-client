import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Link as LinkScroll, animateScroll as scroll } from "react-scroll";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
/*import Link from '@material-ui/core/Link';
*/
import MenuIcon from '@material-ui/icons/Menu';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import ReactNotification from 'react-notifications-component';

import 'react-notifications-component/dist/theme.css';

import { store } from 'react-notifications-component';

import 'animate.css/animate.min.css';

import GoogleLogin from 'react-google-login';

import NavBar from '../../components/NavBar/NavBar';

import RoomForm from './RoomForm';

import { refreshTokenSetup } from './refreshToken';

const copyrightStyle = makeStyles(() => ({
    fontStyle: {
      fontFamily: 'Raleway',
    }
  }));

const scrollToTop = () => {
      scroll.scrollToTop();
  };

function Copyright() {
  const classe = copyrightStyle();
  
  return (
    <Typography variant="body2" color="white" align="center" className={classe.fontStyle}>
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        chatin.io
      </Link>{' '}
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
    backgroundColor: theme.palette.background.paper,
    backgroundColor: '#1e2334',
    padding: theme.spacing(8, 0, 6),
    fontFamily: 'Raleway',
    paddingBottom: '120px',
    color: 'white',
  },
  headerTitle: {
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    background: '#7559FF',
    background: '-webkit-linear-gradient(to right, #7559FF 31%, #AA72CF 57%)',
    background: '-moz-linear-gradient(to right, #7559FF 31%, #AA72CF 57%)',
    background: 'linear-gradient(to right, #7559FF 31%, #AA72CF 57%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  headerDescription: {
    fontFamily: 'Raleway',
    fontWeight: '600',
    background: '#3879CF',
    background: '-webkit-linear-gradient(to right, #3879CF 31%, #3E51CF 57%)',
    background: '-moz-linear-gradient(to right, #3879CF 31%, #3E51CF 57%)',
    background: 'linear-gradient(to right, #3879CF 31%, #3E51CF 57%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  headerButtons: {
    marginTop: theme.spacing(4),
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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    backgroundColor: '#2c3049',
    border: '1px solid #1e2334',
    color: 'white',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  headerEnd: {
    height: '50px',
    backgroundColor: '#2c3049',
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),

  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Raleway',
    backgroundColor: '#2c3049',
    color: 'white',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContentHeader: {
    background: '#3879CF',
    background: '-webkit-linear-gradient(to right, #3879CF 31%, #3E51CF 57%)',
    background: '-moz-linear-gradient(to right, #3879CF 31%, #3E51CF 57%)',
    background: 'linear-gradient(to right, #3879CF 31%, #3E51CF 57%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  cardContent: {
    flexGrow: 1,
    fontFamily: 'Raleway',
  },
  cardButton: {
    paddingBottom: '23px',
    paddingLeft: '15px'
  },
  cardButtonEle: {
    backgroundColor: '#614983', 
  },
  footer: {
    backgroundColor: '#2c3049',
    color: 'white',
    padding: theme.spacing(6),
    fontFamily: 'Raleway',
  },
  footerText: {
    fontFamily: 'Raleway',
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Home() {
  const classes = useStyles();

  const [currentUser, setcurrentUser] = useState(true);
  const [UserName, setUserName] = useState('');
/*  const [roomList, setNewRoom] = useState([]);
*/
  const roomList = [
    {
      user: 'Abdel',
      Name:'room01', 
      Description:'Room01 decription.'
    },
    {
      user: 'Mohamed',
      Name:'room02', 
      Description:'Room02 decription.'
    },
    {
      user: 'Imad',
      Name:'room03', 
      Description:'Room03 decription.'
    }
  ]


  const responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
    setcurrentUser(true)
    setUserName(response.profileObj.name)
    refreshTokenSetup(response)
  }


  const responseErrGoogle = (response) => {
    console.log(response);
  }  

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  console.log(UserName);

  const handleClose = () => {
    setOpen(false);
  };

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar />
      <main className={classes.mainPage}>
        {/* Header unit */}
        <div className={classes.headerContent}>
          <Container maxWidth="sm">
            <br/><br/><br/>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom className={classes.headerTitle}>
              Welcome To ChatIn
            </Typography>
            
            <Typography variant="h5" align="center" color="textSecondary" paragraph className={classes.headerDescription}>
              Join our real time chat application community to chat and communicate with your
              favorite friends or with new people.
            </Typography>

            <div className={classes.headerButtons}> 
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" className={classes.buttonMainStyle} onClick={handleOpen}>
                    Create your room
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary" className={classes.buttonStyle}>
                    <LinkScroll to="rooms" smooth={true} style={{color: 'white'}}>Join a room</LinkScroll>
                  </Button>
                </Grid>
              </Grid>
            </div>

            <br/>

          </Container>
        </div>
        <div className={classes.headerEnd} />

        <Modal
          aria-labelledby="create-room-modal-title"
          aria-describedby="create-room-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>

            { currentUser ? (
              <div className={classes.paper}>
                <h2 id="create-room-modal-title" className="headerTitleForm">Create Room As : {UserName} </h2>
                <p id="create-room-modal-description"></p>
                  {/*<input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /><br/>
                  <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
                  <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/room?name=${name}&room=${room}`}>
                    <button className={'button mt-20'} type="submit">Sign In</button>
                  </Link>*/}

                  <RoomForm currentUser={UserName} />
              </div>
            ) : ( 

              <div className={classes.paper}>
                <h1 id="transition-modal-title" className={classes.headerTitle}>Hey and welcome to ChatIn!</h1>
                <p id="transition-modal-description" style={{fontFamily: 'Raleway'}}>
                  Please sign in to be to create rooms at ChatIn. It's easy, all you need is a Google account (Gmail).
                </p>
                  <GoogleLogin
                    clientId="62977760417-i22kd346qiemos45vu8r38euk3bmk1r6.apps.googleusercontent.com"
                    buttonText="Continue To Sign in Now!"
                    onSuccess={responseGoogle}
                    onFailure={responseErrGoogle}
                    cookiesPolicy={'single_host_login'}
                    className="google-btn"
                    isSignedIn={true}
                    />
              </div>
              )
            }
          </Fade>
        </Modal>

        <Container className={classes.cardGrid} maxWidth="lg">
          {/* End header unit */}
          <br/>
          <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom className={classes.headerTitle} id="rooms">
              Available Rooms
          </Typography>

          <br /><br /><br /><br />
          <div className="cardCntr">
            <Grid container spacing={4}>
              {roomList.map((room) => (
                
                <Grid item xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h4" component="h2" className={classes.cardContentHeader}>
                        {room.Name}
                      </Typography>
                      <Typography>
                        {room.Description}
                      </Typography>
                    </CardContent>
                    <CardActions className={classes.cardButton}>
                      <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center"
                          >
                        { currentUser ? (  
                        <Link to={`/room?name=${room.user}&room=${room.Name}`}>
                          <Button variant="contained" color="primary" className={classes.cardButtonEle}>
                            Join now!
                          </Button>
                        </Link>
                          ) : (
                        <Button variant="contained" disabled color="primary" className={classes.cardButtonEle} disabled>
                          Join now!
                        </Button>
                          )  
                        }
                      </Grid>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          
          </div>
        </Container>
        <br/><br/><br/>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom className={classes.footerText}>
          Footer
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
