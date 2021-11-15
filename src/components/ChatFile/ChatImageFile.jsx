import React from 'react';
import Image from './Image.jsx'

const ChatImageFile = ({ message, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if(message.user === trimmedName) {
    isSentByCurrentUser = true;
  }

  const blob = new Blob([message.text], { type: message.mimeType });

  const url = URL.createObjectURL(blob);

  return (

    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimmedName} {message.time}</p>
          <a href={url} target='_blanc' className="messageBoxMedia justifyEnd">
              <Image fileName={message.fileName} blob={blob} />
          </a>
          <img src="https://cdn3.iconfinder.com/data/icons/login-6/512/LOGIN-10-512.png" className="user-picture mr" />
        </div>
        ) : (
        <div className="messageContainer justifyStart">
          <img src="https://cdn3.iconfinder.com/data/icons/login-6/512/LOGIN-10-512.png" className="user-picture ml" />
          <a href={url} target='_blanc' className="messageBoxMedia justifyStart">
            <Image fileName={message.fileName} blob={blob} />
          </a>
          <p className="sentText pl-10 ">{message.time} {message.user}</p>
        </div>
        )
  );
}   

export default ChatImageFile;