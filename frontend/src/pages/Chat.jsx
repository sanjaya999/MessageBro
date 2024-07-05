import React, { useContext, useState } from 'react'
import UserArea from './UserArea'
import Message from './Message.jsx'
import { ChatContext } from '../context/ChatContext.jsx'
import { AuthContext } from "../context/AuthContext.jsx"
import UserChat from '../components/UserChat.jsx'
import { postReq, baseUrl } from '../utils/services.js'

function Chat() {
  const { user } = useContext(AuthContext)
  const { userChats,updatecurrentchat, isUserChatLoading, userChatError, createChat } = useContext(ChatContext)
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  console.log("these are user chats", userChats);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchInput) return;

    try {
      const response = await postReq(`${baseUrl}/search`, { userName: searchInput });
      console.log("Search response:", response);
      setSearchResults(Array.isArray(response.data) ? response.data : [response.data]);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    }
  };
  const handleAddUser = async (secondId) => {
    const firstId = user?.data.user._id;
    console.log("Current user ID:", firstId);
    console.log("User to add ID:", secondId);
    if (firstId && secondId) {
      const newChat = await createChat(firstId, secondId);
      if (newChat) {
        console.log("New chat created:", JSON.stringify(newChat, null, 2));
        setSearchResults([]);
        setSearchInput('');
      } else {
        console.log("Failed to create new chat");
      }
    } else {
      console.error("Missing user IDs for chat creation");
    }
  };

  console.log("this is searchresult", searchResults);

  return (
    <>
      <h1>Chat</h1>
      <div className='box'>
        <div className='box-header'>
          <div className='recent'>
            <form className="search-form" onSubmit={handleSubmit}>
              <input
                type="text"
                className='find-users'
                placeholder='Search users'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button type='submit' className='search-button'>Search</button>
            </form>
            
            {searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map((result, index) => (
                  <div key={index} className="search-result-item">
                    <div className="user-info">
                      <h3>{result.data.userName}</h3>
                      <h1>{result.data._id}</h1>
                    </div>
                    <button 
                      className="add-user-btn" 
                      onClick={() => handleAddUser(result.data._id)}
                    >
                      Add User
                    </button>
                  </div>
                ))}
              </div>
            )}

<div className='recent-section'>
  <h2>Recent</h2>
</div>
{isUserChatLoading && <p>Loading ..</p>}
{userChats?.data?.map((chat, index) => (
  <div key={chat._id || index} onClick={()=>updatecurrentchat(chat)}>
    <UserChat chat={chat} user={user} />
  </div>
))}
          </div>

          <div className='message'>
            <div className='message-section'>
              <h2>Message</h2>
            </div>
            <h3>
             
            </h3>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat