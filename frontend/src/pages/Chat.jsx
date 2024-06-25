import React, { useContext, useState } from 'react'
import UserArea from './UserArea'
import Message from './Message.jsx'
import { ChatContext } from '../context/ChatContext.jsx'
import { AuthContext } from "../context/AuthContext.jsx"
import UserChat from '../components/UserChat.jsx'
import { postReq, baseUrl } from '../utils/services.js'

function Chat() {
  const { user } = useContext(AuthContext)
  const { userChats, isuserChatsLoading, userChatError } = useContext(ChatContext)
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]); // Change to array for multiple results

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

  console.log("this is searchresult" , searchResults);
  return (
    <>
      <h1>Chat</h1>
      <div className='box'>
        <div className='box-header'>
          <div className='recent'>
            <form  className="search-form" onSubmit={handleSubmit}>
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
                    </div>
                    <button className="add-user-btn">Add User</button>
                  </div>
                ))}
              </div>
            )}

            <div className='recent-section'>
              <h2>Recent</h2>
            </div>
            {isuserChatsLoading && <p>Loading ..</p>}
            {userChats?.data.map((chat, index) => (
              <div key={index}>
                <UserChat chat={chat} user={user} />
              </div>
            ))}
          </div>

          <div className='message'>
            <div className='message-section'>
              <h2>Message</h2>
            </div>
            <h3>chatting section here</h3>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat