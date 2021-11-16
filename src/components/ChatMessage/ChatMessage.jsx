import React from 'react';
import ReactEmoji from 'react-emoji';

const ChatMessage = ({ message: { time, text, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
      
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimmedName} {time}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
          <img src="https://icon2.cleanpng.com/20180331/ffe/kisspng-computer-icons-user-clip-art-user-5abf13dad7aed4.5909364715224718988835.jpg" className="user-picture mr" />
        </div>
        ) : (
        <div className="messageContainer justifyStart">
          <img src="https://cdn3.iconfinder.com/data/icons/login-6/512/LOGIN-10-512.png" className="user-picture ml" />
          <div className="messageBox backgroundLight">
            <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
          </div>
          <p className="sentText pl-10 ">{time} {user}</p>
        </div>
        )
  );
}   

export default ChatMessage;