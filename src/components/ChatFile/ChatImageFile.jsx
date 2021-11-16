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
          <p className="sentText">{trimmedName} {message.time}</p>
          <a href={url} target='_blanc' className="messageBoxMedia justifyEnd">
              <Image fileName={message.fileName} blob={blob} />
          </a>
          <img src="https://icon2.cleanpng.com/20180331/ffe/kisspng-computer-icons-user-clip-art-user-5abf13dad7aed4.5909364715224718988835.jpg" className="user-picture mr" />
        </div>
        ) : (
        <div className="messageContainer justifyStart">
          <img src="https://cdn3.iconfinder.com/data/icons/login-6/512/LOGIN-10-512.png" className="user-picture ml" />
          <a href={url} target='_blanc' className="messageBoxMedia justifyStart">
            <Image fileName={message.fileName} blob={blob} />
          </a>
          <p className="sentText">{message.time} {message.user}</p>
        </div>
        )
  );
}   

export default ChatImageFile;