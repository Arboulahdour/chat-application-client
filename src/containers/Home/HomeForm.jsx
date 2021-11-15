import React, { useState } from 'react';
// import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
// import "bootstrap/dist/css/bootstrap.min.css";

import { connect } from 'react-redux'
import { roomCreateAction } from '../../exports'

import chatting from "../../assets/icons/chatting.svg";

function HomeForm(props) {

//    const [id, setId] = useState('a97-g3D-sax');
//    const [name, setName] = useState('');
    const [room, setRoom] = useState(getRandomString(12));
    const [loading, setLoading] = useState({
      create: 'CREATE A ROOM',
      disabled: '',
      error: 'none'
    });
    const [link, setLink] = useState(false);

    // const handleChangeName = (e) => {
    //   e.preventDefault()
    //   setName(e.target.value);
    //   console.log(name)		
    // }

    // const handleChangeRoom = (e) => {
    //   e.preventDefault()
    //   setRoom(e.target.value);
    //   console.log(room)		
    // }


    
    function getRandomString(length) {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for ( var i = 0; i < length; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }

    // const handleSubmit = (e) => {

    //   e.preventDefault()

    //   //setRoom(getRandomString(12));

    //   console.log('my room', room)

    //   if (room.length !== 0) {

    //     setLoading({
    //       create: 'LOADING...',
    //       disabled: 'disabled',
    //       error: 'none'
    //     });
    
    //     setTimeout(() => {
    //       //console.log('name: ', name)
    //       console.log('room: ', room)
    //       props.roomCreateAction('', room)
    //       //setName('')
    //       setRoom('')
    //       setLoading({
    //         create: 'CREATE THE ROOM',
    //         disabled: '',
    //         error: 'none'
    //       });
    //       }, 1500)
  
    //   } else {
    //     setLoading({
    //       create: 'CREATE THE ROOM',
    //       disabled: '',
    //       error: '1px solid red'
    //     });
    //   }
  
    // }

    const handleClick = (e) => {
  
        // console.log('my room', room)

        // setRoom(getRandomString(12));
  
        setLoading({
        create: 'LOADING...',
        disabled: 'disabled',
        error: 'none'
        });
    
        setTimeout(() => {
        //console.log('name: ', name)
        // console.log('room: ', room)
        props.roomCreateAction('', room)
        //setName('')
        // setRoom('')
        setLink(true)
        setLoading({
            create: 'CREATE A ROOM',
            disabled: '',
            error: 'none'
        });
        }, 2000)
             
    }

    return (
    //   onSubmit={handleSubmit}
      <Form noValidate className="roomForm" > 
        <Col xs="auto" className="form-image">
          <img src={chatting} alt="user" width="60%" height="60%" />
        </Col>
        <br/><br/>
        {/* <Col xs="auto">
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="form-labels">Room's Unique Id</Form.Label>
            <Form.Control 
                type="text" 
                name="room" 
                value={room} 
                placeholder="Room's Unique Id" 
                className="form-inputs"
                //style={{display: 'none'}}
                //disabled='disabled' 
                onChange={handleChangeRoom} 
              />
          </Form.Group>
        </Col> */}
        {/* <Col xs="auto">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="form-labels">Username @</Form.Label>
            <Form.Control 
                type="text" 
                name="name" 
                value={name} 
                placeholder="Username" 
                className="form-inputs" 
                onChange={handleChangeName} 
              />
          </Form.Group>
        </Col> */}
        {link ? (
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="form-labels">Room's link to join 👇:</Form.Label>
            <br/><br/>
            <a style={{fontSize: '16px', textDecoration: 'underline'}} href={`https://chatino.netlify.app/room?id=${room}`} target="blanc">https://chatino.netlify.app/room?id=${room}</a>
            <br/>    
          </Form.Group>
        </Col>
        ) : (
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="form-labels">Create a new chat room with just one click 🧙🏻‍♀️!</Form.Label>
            <br/><br/>
          </Form.Group>
        </Col>
        )
        }
        {/* <Link to={`/room?id=${room}`}> */}
            <Button variant="primary" onClick={handleClick} className="mt-2 form-button" type="submit" disabled={loading.disabled}>
                {loading.create}
            </Button>
        {/* </Link> */}
        
      </Form>
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
)(HomeForm)