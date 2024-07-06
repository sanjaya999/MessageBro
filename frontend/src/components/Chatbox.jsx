import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext.jsx'
import { ChatContext } from '../context/ChatContext';
import { userFetch } from '../../hooks/userFetch.js';

function Chatbox() {
  const {user} = useContext(AuthContext);
 const currentuser = user.data.user._id
  console.log("current user" , currentuser);
  const {currentchat,message} = useContext(ChatContext);
  console.log("chatbox currentchat" , currentchat);
 
  const {fetchUser} = userFetch(currentchat,currentuser)
  console.log("recipientId" , fetchUser);

  return (
    <div>Chatbox</div>
  )
}

export default Chatbox