import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext.jsx'
import { ChatContext } from '../context/ChatContext';
import { userFetch } from '../../hooks/userFetch.js';
import InputEmoji from "react-input-emoji"

function Chatbox() {
  const { user } = useContext(AuthContext);
  const currentUserId = user.data.user._id;
  const { currentchat, message, sendtext } = useContext(ChatContext);
  const [textmsg, settextmsg] = useState("")
 
  const { fetchUser } = userFetch(currentchat, currentUserId)

  if (!fetchUser) {
    return (
      <div className="no-conversation">
        <h1>No conversation selected</h1>
      </div>
    )
  }

  return (
    <div className="message">
      <div className="message-list">
        {message?.data?.data?.map((msg, index) => (
          <div 
            className={`msg ${msg.senderId === currentUserId ? 'sent' : 'received'}`} 
            key={index}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <InputEmoji value={textmsg} onChange={settextmsg} />
        <button onClick={() => sendtext(textmsg, currentUserId, currentchat._id, settextmsg)}>Send</button>
      </div>
    </div>
  )
}

export default Chatbox