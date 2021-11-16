import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import queryString from 'query-string';
import io from "socket.io-client";
import { Layout, Menu, Dropdown } from 'antd';

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  TeamOutlined,
  HomeOutlined,
  LogoutOutlined,
  WechatOutlined,
//  YoutubeOutlined,
  FormOutlined,
} from '@ant-design/icons';

import 'antd/dist/antd.css';

import ReactNotification from 'react-notifications-component';

import 'react-notifications-component/dist/theme.css';

import { store } from 'react-notifications-component';

import 'animate.css/animate.min.css';

import { connect } from 'react-redux'
import { roomCreateAction } from '../../exports'

// import RoomForm from '../Home/RoomForm';

import ChatBox from '../../components/ChatBox/ChatBox';

import BoardContainer from '../../components/BoardContainer/BoardContainer';

import YoutubeContainer from '../../components/YoutubeContainer/YoutubeContainer';

import chatting from "../../assets/icons/chatting.svg";

const APIEndpoint = process.env.REACT_APP_APIENDPOINT;

// const APIEndpoint = "http://localhost:5000"

let socket;

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

// Room = ({ location })

const Room = (props) => {

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [collapsed, setcollapsed] = useState(false);

  const [name, setName] = useState('');
  const [room, setRoom] = useState(props.room);
  const [form_name, setFormName] = useState('');
  const [form_room, setFormRoom] = useState('');
  const [users, setUsers] = useState([]);
  const [chatBox, setchatBox] = useState({display: 'none'});
  const [whiteBoard, setWhiteBoard] = useState({display: 'none'});
  const [youtubeVideo, setYoutubeVideo] = useState({display: 'none'});

  const [chatBoxAnimation, setchatBoxAnimation] = useState('');
  const [whiteBoardAnimation, setwhiteBoardAnimation] = useState('');
  const [youtubeVideoAnimation, setyoutubeVideoAnimation] = useState('');

  const [homeBox, sethomeBox] = useState({display: ''});
  const [homeBoxAnimation, sethomeBoxAnimation] = useState('');

  /*const [isTyping, setIsTyping] = useState(false);
  */
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState();

  const [timeout, setTimeOut] = useState(undefined);
  //const [isDrawing, setIsDrawing] = useState(false);
  
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [brushForm, setBrushForm] = useState('round');

  //const [videoUrl, setVideoUrl] = useState('');

  const [loading, setLoading] = useState({
    create: 'CONNECT TO THE ROOM',
    disabled: '',
    error: 'none'
  });

  const [sending, setSending] = useState(false)

  const query = new URLSearchParams(useLocation().search);

  const handleChangeName = (e) => {
    e.preventDefault()
    setFormName(e.target.value);
    console.log(form_name)		
  }

  const handleChangeRoom = (e) => {
    e.preventDefault()
    setFormRoom(e.target.value);
    console.log(form_room)		
  }
  // const handleSubmit = (e) => {}
  const handleSubmit = (e) => {

    e.preventDefault()

    const handleSuccessNotif = () => {
      store.addNotification({
        title: "Welcome:",
        message: form_name + " welcome to this room. Enjoy!",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeInRight"],
        animationOut: ["animate__animated", "animate__fadeOutRight"],
        dismiss: {
          duration: 4000,
          onScreen: true,
          showIcon: true,
          delay: 5
        },
        width: 270
      });
    }

    if (form_name.length !== 0 && room.length !== 0) {

      setLoading({
        create: 'LOADING...',
        disabled: 'disabled',
        error: 'none'
      });
  
      setTimeout(() => {
        console.log('name: ', form_name)
        console.log('room: ', form_room)
        props.roomCreateAction(form_name, form_room)
        setFormName('')
        //setFormRoom('')
        handleSuccessNotif()
        handleClose()
        setLoading({
          create: 'CONNECT TO THE ROOM',
          disabled: '',
          error: 'none'
        });
        // Swal.fire({
        //   icon: 'success',
        //   title: '<h4 style="color:white"> You have successfully subscribed ! </h4>',
        //   showConfirmButton: true,
        //   background: '#021429',
        //   confirmButtonText:
        //     'Okay <i class="fa fa-thumbs-up"></i>',
        //   })
        }, 2000)

    } else {
      setLoading({
        create: 'CONNECT TO THE ROOM',
        disabled: '',
        error: '1px solid red'
      });
    }

  }


  useEffect(() => {
  // const { name, room } = queryString.parse(location.search);

  socket = io(APIEndpoint);

  const room_id = query.get("id");

  const { name } = props

  console.log('the name is : ', name)
  console.log('the room is : ', room)

  setRoom(room_id);
  setName(name);

  socket.emit('join', { name, room }, (error) => {
    if(error === "Username is taken.") {
        handleErrorNotif();
        pageReload();
      }

    if(error === "Username and room are required."){
        handleWarningNotif();
    }
      console.log(error);
    });

  const pageReload = () => {
    setTimeout(
      function(){
          window.location.reload();}, 
    5000);
  }


  const handleWarningNotif = () => {
    store.addNotification({
      title: "Info:",
      message: "Providing a username is mandatory to join the room !",
      type: "warning",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeInRight"],
      animationOut: ["animate__animated", "animate__fadeOutRight"],
      dismiss: {
        duration: 4000,
        onScreen: true,
        showIcon: true,
      },
      width: 270
    });
  }

  const handleErrorNotif = () => {
    store.addNotification({
      title: "Error:",
      message: "This username is already used in this room ! Try with another one.",
      type: "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeInRight"],
      animationOut: ["animate__animated", "animate__fadeOutRight"],
      dismiss: {
        duration: 4000,
        onScreen: true,
        showIcon: true,
      },
      width: 270
    });
  }

  // window.onload = handleOnloadNotif();
  
  }, [APIEndpoint, props]); // [APIEndpoint, location.search]
  

  useEffect(() => {

    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
        });

    socket.on('canvas-data', function(data){
      
      /*var interval = setInterval(function(){
        if (isDrawing) return;
        setIsDrawing(true);
        clearInterval(interval)
        var image = new Image();
        var canvas = document.querySelector('#board');
        var ctx = canvas.getContext('2d');
        image.onload = function() {
          ctx.drawImage(image, 0, 0);
          setIsDrawing(false);
        };
        image.src = data;
      }, 1000)*/

      var image = new Image();
      var canvas = document.querySelector('#board');
      var ctx = canvas.getContext('2d');
      image.onload = function() {
         ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        
      };
      image.src = data;

    });

  }, [props]);

  const selectFile = (event) => {
    
    const handleUploadErrorNotif = () => {
      store.addNotification({
        title: "Error:",
        message: "The size of this file exceeds the defined max size !",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeInRight"],
        animationOut: ["animate__animated", "animate__fadeOutRight"],
        dismiss: {
          duration: 4000,
          onScreen: true,
          showIcon: true,
        },
        width: 270
      });
    }
    if (event.target.files[0]){
      if (event.target.files[0].type === "image/gif" || event.target.files[0].type === "image/png" || event.target.files[0].type === "image/jpeg" || event.target.files[0].type === "image/bmp" || event.target.files[0].type === "image/tif") {
        if (event.target.files[0].size < 2097152) {
          console.log('the file size is :', event.target.files[0].size)
          console.log('the file type is :', event.target.files[0].type)
          setMessage(event.target.files[0].name);
          setFile(event.target.files[0]);
        } else {
          setMessage('');
          handleUploadErrorNotif()  
        }
      } else if (event.target.files[0].type === "video/mp4" || event.target.files[0].type === "video/webm") {
        if (event.target.files[0].size < 20971520) {
          console.log('the file size is :', event.target.files[0].size)
          console.log('the file type is :', event.target.files[0].type)
          setMessage(event.target.files[0].name);
          setFile(event.target.files[0]);
        } else {
          setMessage('');
          handleUploadErrorNotif()
        }
      } else if (event.target.files[0].type === "application/pdf" && event.target.files[0].size < 10485760) {
        console.log('the file size is :', event.target.files[0].size)
        console.log('the file type is :', event.target.files[0].type)
        setMessage(event.target.files[0].name);
        setFile(event.target.files[0]);
      } else {
        setMessage('');
        handleUploadErrorNotif()
      }
        
    } else {
      setMessage('');
    }
  };


/*  const handleTyping = () => { // continually delays setting "isTyping" to false for 500ms until the user has stopped typing and the delay runs out
    setIsTyping(true);
    console.log('isTyping after: ', isTyping);
  };

  const noTyping = () => {
    setIsTyping(false);
  };

*/

  useEffect(() => {
    drawOnCanvas();
  })

  var ctx;

  var drawOnCanvas = () => {

    var canvas = document.querySelector('#board');
    ctx = canvas.getContext('2d');

    var sketch = document.querySelector('#sketch');
    var sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue('width'));
    canvas.height = parseInt(sketch_style.getPropertyValue('height'));

    var mouse = {x: 0, y: 0};
    var last_mouse = {x: 0, y: 0};

    /* Mouse Capturing Work */
    canvas.addEventListener('mousemove', function(e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
    }, false);


    /* Drawing on Paint App */
    ctx.lineWidth = brushSize;
    ctx.lineJoin = 'round';
    ctx.lineCap = brushForm;
    ctx.strokeStyle = brushColor;

    canvas.addEventListener('mousedown', function(e) {
        canvas.addEventListener('mousemove', onPaint, false);
    }, false);

    canvas.addEventListener('mouseup', function() {
        canvas.removeEventListener('mousemove', onPaint, false);
    }, false);

    const canvasEncode = () => {
      var base64ImageData = canvas.toDataURL('image/png', 1.0);
      socket.emit('canvas-data', base64ImageData)
    }

    var onPaint = function() {
        ctx.beginPath();
        ctx.moveTo(last_mouse.x, last_mouse.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.closePath();
        ctx.stroke();

        if (timeout !== undefined) {
          clearTimeout();
        }

        setTimeout(canvasEncode(), 1000)
    };
  }

  useEffect(() => {

    ctx.lineWidth = brushSize
    ctx.lineJoin = 'round';
    ctx.lineCap = brushForm;
    ctx.strokeStyle = brushColor;

    socket.on('canvas-data', function(data){

      var image = new Image();
      var canvas = document.querySelector('#board');
      var ctx = canvas.getContext('2d');
      image.onload = function() {
        // ctx.drawImage(image, 0, 0);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      };
      image.src = data;

    });

  }, []) // [brushSize, brushColor]

  useEffect(() => {
    shareYoutubeVideo();
  }, [props])

  var shareYoutubeVideo = () => {
    var video = document.getElementById("video-url").src;
    console.log('the video url : ', video);
  }

  const openHomeBox = () => {
    sethomeBox({display: ''})
    setchatBox({display: 'none'});
    setWhiteBoard({display: 'none'});
    setYoutubeVideo({display: 'none'});
    setwhiteBoardAnimation("animate__animated animate__zoomOut");
    setyoutubeVideoAnimation("animate__animated animate__zoomOut");
    setchatBoxAnimation("animate__animated animate__zoomOut");
    sethomeBoxAnimation("animate__animated animate__fadeIn");
  };

  const openChatBox = () => {
    setchatBox({display: ''});
    setWhiteBoard({display: 'none'});
    setYoutubeVideo({display: 'none'});
    setwhiteBoardAnimation("animate__animated animate__zoomOut");
    setyoutubeVideoAnimation("animate__animated animate__zoomOut");
    setchatBoxAnimation("animate__animated animate__zoomIn");

    sethomeBox({display: 'none'})
    sethomeBoxAnimation("animate__animated animate__zoomOut");
  };

  // const closeChatBox = () => {
  //   setchatBoxAnimation("animate__animated animate__zoomOut");
  //   setwhiteBoardAnimation("animate__animated animate__zoomOut");
  //   setyoutubeVideoAnimation("animate__animated animate__zoomOut");
  //   setchatBox({display: 'none'});
  //   setWhiteBoard({display: 'none'});
  //   setYoutubeVideo({display: 'none'});

  //   sethomeBox({display: 'none'})
  //   sethomeBoxAnimation("animate__animated animate__zoomOut");
  // };

  const openWhiteBoard = () => {
    setWhiteBoard({display: ''});
    setchatBox({display: 'none'})
    setYoutubeVideo({display: 'none'})
    setchatBoxAnimation("animate__animated animate__zoomOut");
    setyoutubeVideoAnimation("animate__animated animate__zoomOut");
    setwhiteBoardAnimation("animate__animated animate__zoomIn");

    sethomeBox({display: 'none'})
    sethomeBoxAnimation("animate__animated animate__zoomOut");
  };

  const openYoutubeVideo = () => {
    setYoutubeVideo({display: ''});
    setWhiteBoard({display: 'none'});
    setchatBox({display: 'none'})
    setchatBoxAnimation("animate__animated animate__zoomOut");
    setwhiteBoardAnimation("animate__animated animate__zoomOut");
    setyoutubeVideoAnimation("animate__animated animate__zoomIn");
  };


  const sendMessage = (event) => {
    event.preventDefault();

/*    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }*/

    if(file) {
      setSending(true);
      const messageObject = {
          type: "file",
          text: file,
          mimeType: file.type,
          fileName: file.name
        }
      socket.emit('sendMessage', messageObject, () => {
        setMessage('');
        setFile();
        setSending(false)
      });
    } else if(message) {
      const messageObject = {
        type: "text",
        text: message,
      }
      socket.emit('sendMessage', messageObject, () => setMessage(''));
    } else {
      setMessage('');
      setFile()
    }


  };

  const menu = (
    <Menu theme="dark" style={{marginTop: '35px'}}>
      {users.map(({name}, index) => (
          <Menu.Item key={index}><img src="https://nanuntio.com/wp-content/uploads/2020/03/service_default_avatar_182956.png" className="user-picture ml" alt="user"/> {name}</Menu.Item>
      ))}
    </Menu>
  );

  const changeState = () => setcollapsed(!collapsed)

  return (
    <div>
      <ReactNotification />
      <Layout style={{ minHeight: '100vh', background: '#1e2334', color: 'white' }}>
        <Sider trigger={null} collapsible collapsed={collapsed} className="sideBar">
          <div className="logo" />  
          <Menu theme="dark" defaultSelectedKeys={['-1']} mode="inline" className="sideBar-menu">           
            <Menu.Item key="-1" icon={<HomeOutlined />} onClick={openHomeBox}>
              <span>Home</span>
            </Menu.Item>          
            <SubMenu key="sub1" icon={<TeamOutlined />} title="Connected People">
              {users.map(({name}, index) => (
              <Menu.Item className="sideBar-submenu" key={index + 8}><img src="https://nanuntio.com/wp-content/uploads/2020/03/service_default_avatar_182956.png" className="user-picture ml" alt="user" /> {name}</Menu.Item>
              ))}
            </SubMenu>         
            <Menu.Item key="3" icon={<WechatOutlined />} onClick={openChatBox}>
              <span>Room Chatbox</span>
            </Menu.Item>
            <Menu.Item key="4" icon={<FormOutlined />} onClick={openWhiteBoard}>
              <span>White Board</span>
            </Menu.Item>
            {/* <Menu.Item key="5" icon={<YoutubeOutlined />} onClick={openYoutubeVideo}>
              <span>Youtube</span>
            </Menu.Item> */}
            <Menu.Item key="5" icon={<LogoutOutlined />}>
              <a href='/'>Exit</a>
            </Menu.Item>
          </Menu>
        </Sider>      
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: changeState,
            })}
            <div>
              <Menu theme="dark" defaultSelectedKeys={['-1']} className="mobile-menu">
                <Menu.Item key="-1" icon={<HomeOutlined />} className="mobile-menu-item" onClick={openHomeBox}>
                  <span />
                </Menu.Item>               
                <Menu.Item key="2" icon={<TeamOutlined />} className="mobile-menu-item">
                  <Dropdown overlay={menu} placement="bottomCenter">
                    <a />
                  </Dropdown>
                </Menu.Item>
                <Menu.Item key="3" icon={<WechatOutlined />} className="mobile-menu-item" onClick={openChatBox}>
                  <span />
                </Menu.Item>
                <Menu.Item key="4" icon={<FormOutlined />} className="mobile-menu-item" onClick={openWhiteBoard}>
                  <span />
                </Menu.Item>
                <Menu.Item key="5" icon={<LogoutOutlined />} className="mobile-menu-item" style={{marginTop: '-1px'}}>
                  <a href="/"></a>
                </Menu.Item>
              </Menu>
            </div>
          </Header>        
          <Content style={{paddingLeft: '0', paddingRight: '0'}}>
            <div className={homeBoxAnimation} style={homeBox}>
              <div className="home-box">
                <h1>Room's Id ✔️:<span style={{color: '#aaacb2'}}> {room}</span></h1>
                <h1>You can share the following link of this room 🌐 :<a href={`https://chatino.netlify.app/room?id=${room}`} style={{textDecoration: 'underline'}} target="blanc"> https://chatino.netlify.app/room?id={room}</a></h1>
              </div>
            </div>
            <div style={chatBox} className={chatBoxAnimation}>        
              <ChatBox room={room} messages={messages} name={name} message={message} sending={sending} setMessage={setMessage} sendMessage={sendMessage} selectFile={selectFile} />
            </div>
            <div style={whiteBoard} className={whiteBoardAnimation}>
              <div className="page-content-board">
                <div className="board-container">
                  <div className="tools-section">  
                    <div className="color-picker">
                      Brush Color : &nbsp;
                      <input 
                        type="color" 
                        value={brushColor} 
                        onChange={({ target: { value } }) => setBrushColor(value)}
                        />
                    </div>
                    <div className="brush-size">
                      Brush Size : &nbsp;
                      <select 
                        value={brushSize}
                        onChange={({ target: { value } }) => setBrushSize(value)}
                        >
                        <option>5</option>
                        <option>10</option>
                        <option>15</option>
                        <option>20</option>
                        <option>25</option>
                        <option>30</option>
                      </select>
                    </div>                   
                    <div className="brush-form">
                      Brush Form : &nbsp;
                      <select 
                        value={brushForm}
                        onChange={({ target: { value } }) => setBrushForm(value)}
                        >
                        <option>Butt</option>
                        <option>Square</option>
                        <option>Round</option>
                      </select>
                    </div>
                  </div>  
                  <BoardContainer room={room} name={name} />
                </div>
              </div>
            </div>
            <div style={youtubeVideo} className={youtubeVideoAnimation}>
              <div className="page-content-youtube">
                <div className="open-youtube-searchbox">
                  <button className="open-youtube-searchbox-btn">Search Videos</button>
                </div>
                <div className="youtube-container">
                  <YoutubeContainer room={room} name={name} videoUrl={''} />
                </div>
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center', color: 'white' }} className="site-layout-background">Copyright © chatIn 2021.</Footer>
        </Layout>
      </Layout>

      <Modal 
          show={show} 
          //onHide={handleClose} 
          animation={true}
          contentClassName="modal-border-radius"
          backdrop="static"
        >
          <Modal.Header className="modal-form">
            <Modal.Title>Connect to the Chat Room 💬</Modal.Title>
          </Modal.Header> 
          <Modal.Body className="modal-body-style">
          <Form noValidate className="roomForm" onSubmit={handleSubmit}>
            <Col xs="auto" className="form-image">
              <img src={chatting} alt="user" width="60%" height="60%" />
            </Col>
            <br/><br/>
            <Col xs="auto">
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="form-labels">Room's Id</Form.Label>
                <Form.Control 
                    type="text" 
                    name="room" 
                    value={room} 
                    placeholder="Room's Id" 
                    className="form-inputs"
                    disabled='disabled' 
                    onChange={handleChangeRoom} 
                  />
              </Form.Group>
            </Col>
            <Col xs="auto">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="form-labels">Username @</Form.Label>
                <Form.Control 
                    type="text" 
                    name="name" 
                    value={form_name} 
                    placeholder="Username" 
                    className="form-inputs" 
                    onChange={handleChangeName} 
                  />
              </Form.Group>
            </Col>
            <Button variant="primary" className="mt-2 form-button" type="submit" disabled={loading.disabled}>
              {loading.create}
            </Button>
          </Form>
          </Modal.Body>
      </Modal>
    </div>
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
    roomCreateAction: (form_name,form_room) => dispatch(roomCreateAction(form_name,form_room))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room)