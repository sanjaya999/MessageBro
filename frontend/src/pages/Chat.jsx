import React from 'react'
import UserArea from './UserArea'
import Message from './Message.jsx'


function Chat() {
  return (
    <>
      <h1>Chat</h1>
      <div className="Message">
         <Message />
      </div>

      <div className="userarea">
        <UserArea />
      </div>
    
    </>
   
  )
}

export default Chat