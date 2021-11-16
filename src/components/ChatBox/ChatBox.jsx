import React, { useState, useEffect } from "react";
import { Row, Col } from 'antd';
import { Tooltip } from 'reactstrap';
import ScrollToBottom from 'react-scroll-to-bottom';
import ChatMessage from '../ChatMessage/ChatMessage';
import ChatImageFile from '../ChatFile/ChatImageFile';
import ChatVideoFile from '../ChatFile/ChatVideoFile';
import ChatDocumentFile from '../ChatFile/ChatDocumentFile';
import spinner from '../../assets/icons/spinner.gif';

const ChatBox = ({ room, messages, sending, name, setMessage, sendMessage, message, selectFile }) => {
	  
    const getImage = () => {
      document.getElementById("upImage").click();
    }

    const getVideo = () => {
      document.getElementById("upVideo").click();
    }

    const getDocument = () => {
      document.getElementById("upDocument").click();
    }

    const [tooltipImageOpen, setTooltipImageOpen] = useState(false);
    const [tooltipVideoOpen, setTooltipVideoOpen] = useState(false);
    const [tooltipFileOpen, setTooltipFileOpen] = useState(false);

    const toggleImage = () => setTooltipImageOpen(!tooltipImageOpen);
    const toggleVideo = () => setTooltipVideoOpen(!tooltipVideoOpen);
    const toggleFile = () => setTooltipFileOpen(!tooltipFileOpen);

    return (
      <Row justify="center" className="page-content">
        <Col span={23}>
          <div class="chat-page">
            <div className="chat-page-header"> 
                Chat Box of : {room}
            </div>
            <div class="msg-inbox">
              <div class="chats">
                  <ScrollToBottom className="msg-page">                       
                    {messages.map((message, i) =>
                      message.type === 'file' ? (
                        message.mimeType === 'image/jpeg' ? (
                            <div key={i}>
                              <ChatImageFile message={message} name={name}/>
                            </div>
                          ) : 
                        message.mimeType === 'image/png' ? (
                            <div key={i}>
                              <ChatImageFile message={message} name={name}/>
                            </div>
                          ) :
                        message.mimeType === 'image/gif' ? (
                            <div key={i}>
                              <ChatImageFile message={message} name={name}/>
                            </div>
                          ) :
                        message.mimeType === 'video/mp4' ? (
                            <div key={i}>
                              <ChatVideoFile message={message} name={name}/>
                            </div>
                          ) :
                        message.mimeType === 'video/webm' ? (
                            <div key={i}>
                              <ChatVideoFile message={message} name={name}/>
                            </div>
                          ) :
                        message.mimeType === 'application/pdf' ? (
                            <div key={i}>
                              <ChatDocumentFile message={message} name={name}/>
                            </div>
                          ) : (
                            <br style={{display: 'none'}} />

                          )                              
                      ) : (
                        <div key={i}>
                          <ChatMessage message={message} name={name} />
                        </div>
                      )  
                    )}
                  </ScrollToBottom>
              </div>
            </div>
            <div class="msg-bottom">
              <div class="input-group">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="send message..." 
                    value={message} 
                    name="message"
                    autocomplete="off"
                    onChange={({ target: { value } }) => setMessage(value)}
                    onKeyPress={event => event.key === 'Enter' && sending === false ? sendMessage(event) : null} 
                  />
                {sending ? (
                  <div class="input-group-append">
                    <span class="input-group-text"><img src={spinner} height="25px" width="25px" style={{marginLeft: "7px", marginTop: "3px"}} alt="spinner" /></span>
                  </div>
                ) : (
                  <div class="input-group-append">
                    <span class="input-group-text" onClick={e => sendMessage(e)}><i class="fa fa-paper-plane fa-lg"></i></span>
                  </div>
                )}  
                <input 
                    type="file"
                    id="upImage"
                    style={{display: 'none'}} 
                    name="image"
                    accept="image/gif, image/jpeg, image/png, image/bmp, image/tif"
                    onChange={selectFile} 
                  />    
                <i class="fa fa-image fa-lg" id="TooltipImage" onClick={getImage}></i>
                <Tooltip 
                    style={{ background: 'rgba(0,0,0,0.99)', 
                              color: 'white', 
                              padding: '5px', 
                              paddingLeft: '6px', 
                              paddingRight: '6px', 
                              borderRadius: '4px', 
                              fontSize: '10px'
                          }} 
                    placement="bottom" 
                    isOpen={tooltipImageOpen}
                    target="TooltipImage" 
                    toggle={toggleImage}
                  >
                  image (max 2MB)
                </Tooltip> 
                <input 
                    type="file"
                    id="upVideo"
                    style={{display: 'none'}} 
                    name="video"
                    accept="video/mp4, video/webm"
                    onChange={selectFile} 
                  />
                <i class="fa fa-file-video-o fa-lg" id="TooltipVideo" onClick={getVideo}></i> 
                <Tooltip 
                    style={{ background: 'rgba(0,0,0,0.99)', 
                              color: 'white', 
                              padding: '5px', 
                              paddingLeft: '6px', 
                              paddingRight: '6px', 
                              borderRadius: '4px', 
                              fontSize: '10px'
                          }} 
                    placement="bottom" 
                    isOpen={tooltipVideoOpen}
                    target="TooltipVideo" 
                    toggle={toggleVideo}
                  >
                  video (max 20MB)
                </Tooltip>
                <input 
                    type="file"
                    id="upDocument"
                    style={{display: 'none'}} 
                    name="document"
                    accept="application/pdf"
                    onChange={selectFile} 
                  />
                <i class="fa fa-file-o fa-lg" id="TooltipFile" onClick={getDocument}></i>
                <Tooltip 
                    style={{ background: 'rgba(0,0,0,0.99)', 
                              color: 'white', 
                              padding: '5px', 
                              paddingLeft: '6px', 
                              paddingRight: '6px', 
                              borderRadius: '4px', 
                              fontSize: '10px'
                          }} 
                    placement="bottom" 
                    isOpen={tooltipFileOpen}
                    target="TooltipFile" 
                    toggle={toggleFile}
                  >
                  File (max 10MB)
                </Tooltip>
              </div>
            </div>
          </div>  
        </Col>
      </Row>
	  );
}

export default ChatBox;