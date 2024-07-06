import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext.jsx'
import { ChatContext } from '../context/ChatContext';
import { userFetch } from '../../hooks/userFetch.js';
import InputEmoji from "react-input-emoji"

function Chatbox() {
  const { user } = useContext(AuthContext);
  const currentUserId = user.data.user._id;
  const { currentchat, message, sendtext } = useContext(ChatContext);
  const [textmsg, settextmsg] = useState("")
  const [localMessages, setLocalMessages] = useState([]);
 
  const { fetchUser } = userFetch(currentchat, currentUserId)

  useEffect(() => {
    if (message?.data?.data) {
      setLocalMessages(message.data.data);
    }
  }, [message]);

  if (!fetchUser) {
    return (
      <div className="no-conversation">
        <h1>No conversation selected</h1>
      </div>
    )
  }

  const handleSendMessage = () => {
    if (textmsg.trim()) {
      const newMessage = { 
        text: textmsg, 
        senderId: currentUserId,
        _id: Date.now().toString() // Temporary ID
      };
      setLocalMessages(prev => [...prev, newMessage]);
      sendtext(textmsg, currentUserId, currentchat._id, settextmsg);
      settextmsg("");
    }
  };

  const isMessageSentByCurrentUser = (msg) => {
    return msg.senderId === currentUserId;
  };
  
  return (
    <div className="chatbox">
      <div className="chat-header">
        <h3>{fetchUser.data.data.userName}</h3>
      </div>
      <div className="message-list">
        {localMessages.map((msg, index) => (
          <div 
            className={`message ${isMessageSentByCurrentUser(msg) ? 'sent' : 'received'}`} 
            key={msg._id || index}
          >
            <div className="message-content">{msg.text}</div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <InputEmoji value={textmsg} onChange={settextmsg} onEnter={handleSendMessage} />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  )
}

export default Chatbox