import { createContext, useState, useEffect, useCallback } from "react";
import { messageUrl, chatUrl, baseUrl, getReq, postReq } from "../utils/services.js";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState();
  const [isUserChatLoading, setIsUserChatLoading] = useState(false);
  const [userChatError, setUserChatError] = useState(null);
  const [thisChat, setThisChat] = useState([]);

  useEffect(() => {
    const getChats = async () => {
      const response = await getReq(`${baseUrl}/findall`);
      console.log("this is getChats", response);
    };
    getChats();
  }, []);

  useEffect(() => {
    const getUserChats = async () => {
      const userID = user?.data.user._id;
      console.log("this is chatContext ID", userID);

      if (userID) {
        setIsUserChatLoading(true);
        setUserChatError(null);
        const response = await getReq(
          `${chatUrl}/finduserchat/${userID}`
        );
        console.log("this is response in chatContext", response);
        setIsUserChatLoading(false);

        if (response.error) {
          return setUserChatError(response.data);
        }

        setUserChats(response.data);
      }
    };
    getUserChats();
  }, [user]);

  useEffect(() => {
    const getUsers = async () => {
      if (userChats) {
        const response = await getReq(`${baseUrl}/findall`);
        if (response.error) {
          return console.log("error", response);
        }
        console.log("userChats:", JSON.stringify(userChats, null, 2));
        console.log("response.data:", JSON.stringify(response.data, null, 2));
  
        const pchats = response.data.data?.filter((u) => {
          let isChatCreated = false;
          if (userChats && userChats.data) {
            isChatCreated = userChats.data.some((chat) => {
              if (!chat || !chat.members) {
                console.log("Chat without members:", chat);
                return false;
              }
              return chat.members.includes(u._id);
            });
          }
          return !isChatCreated;
        });
        setThisChat(pchats);
      }
    };
  
    if (userChats) {
      getUsers();
    }
  }, [userChats]);
  const createChat = useCallback(async (firstId, secondId) => {
    try {
      const response = await postReq(
        `${chatUrl}/createchat`, JSON.stringify({
          firstId,
          secondId
        })
      );
  
      console.log("Create chat response:", JSON.stringify(response, null, 2));
  
      const newChat = response.data.data; // The actual chat object is in response.data.data
  
      setUserChats((prev) => {
        if (!prev) return { data: [newChat] };
        return { ...prev, data: [...(prev.data || []), newChat] };
      });
      
      return newChat;
    } catch (error) {
      console.log("error occurred", error);
      return null;
    }
  }, []);

  return (
    <ChatContext.Provider
      value={{ userChats, createChat, userChatError, isUserChatLoading, thisChat }}
    >
      {children}
    </ChatContext.Provider>
  );
};
