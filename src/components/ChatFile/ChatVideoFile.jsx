import React from 'react';
import Video from './Video.jsx'

const ChatVideoFile = ({ message, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if(message.user === trimmedName) {
    isSentByCurrentUser = true;
  }

  const blob = new Blob([message.text], { type: message.mimeType });

  const url = URL.createObjectURL(blob);

  /*console.log(url);*/

  return (
      
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimmedName} {message.time}</p>
          <a href={url} target='_blanc' className="messageBoxMedia justifyEnd">
              <Video fileName={message.fileName} blob={blob} videoType={message.mimeType} url={url} />
          </a>
          <img src="https://cdn3.iconfinder.com/data/icons/login-6/512/LOGIN-10-512.png" className="user-picture mr" />
        </div>
        ) : (
        <div className="messageContainer justifyStart">
          <img src="https://cdn3.iconfinder.com/data/icons/login-6/512/LOGIN-10-512.png" className="user-picture ml" />
          <a href={url} target='_blanc' className="messageBoxMedia justifyStart">
            <Video fileName={message.fileName} blob={blob} videoType={message.mimeType} url={url} />
          </a>
          <p className="sentText pl-10 ">{message.time} {message.user}</p>
        </div>
        )
  );
}   

export default ChatVideoFile;