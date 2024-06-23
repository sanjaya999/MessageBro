import React, { useContext } from 'react'
import UserArea from './UserArea'
import Message from './Message.jsx'
import { ChatContext } from '../context/ChatContext.jsx'


function Chat() {
  const {userChats , isuserChatsLoading , userChatError} = useContext(ChatContext)
  console.log(userChats);
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