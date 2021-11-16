import React from 'react';

const ChatDocumentFile = ({ message, name }) => {
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
          <div className="messageBox backgroundBlue">
              <a className="messageText colorWhite document-text" href={url} target="_blanc">{message.fileName}</a>
          </div>
          <img src="https://icon2.cleanpng.com/20180331/ffe/kisspng-computer-icons-user-clip-art-user-5abf13dad7aed4.5909364715224718988835.jpg" className="user-picture mr" />
        </div>
        ) : (
        <div className="messageContainer justifyStart">
          <img src="https://cdn3.iconfinder.com/data/icons/login-6/512/LOGIN-10-512.png" className="user-picture ml" />
          <div className="messageBox backgroundLight">
            <a className="messageText colorDark document-text" href={url} target="_blanc">{message.fileName}</a>
          </div>
          <p className="sentText pl-10 ">{message.time} {message.user}</p>
        </div>
        )
  );
}   

export default ChatDocumentFile;