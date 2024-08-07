import { createContext, useState, useEffect, useCallback } from "react";
import {
  messageUrl,
  chatUrl,
  baseUrl,
  getReq,
  postReq,
} from "../utils/services.js";
import { io } from "socket.io-client";
export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState({ data: [] });
  const [isUserChatLoading, setIsUserChatLoading] = useState(false);
  const [userChatError, setUserChatError] = useState(null);
  const [thisChat, setThisChat] = useState([]);
  const [currentchat, setcurrentchat] = useState(null);
  const [message, setmessage] = useState();
  const [messageError, setmessageError] = useState();
  const [newmessage, setnewmessage] = useState(null);
  const [socket, setsocket] = useState();

  console.log("currentchat", currentchat);
  console.log("particular chat", message);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setsocket(newSocket);

    return()=>{
      newSocket.disconnect();
    }
  }, [user]);

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
        const response = await getReq(`${chatUrl}/finduserchat/${userID}`);
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

  const updatecurrentchat = useCallback((chat) => {
    setcurrentchat(chat);
  }, []);

  const createChat = useCallback(async (firstId, secondId) => {
    try {
      const response = await postReq(
        `${chatUrl}/createchat`,
        JSON.stringify({
          firstId,
          secondId,
        })
      );

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

  useEffect(() => {
    const getMessage = async () => {
      setmessageError(null);
      const response = await getReq(
        `${messageUrl}/getmessage/${currentchat?._id}`
      );
      setmessage(response);
    };
    getMessage();
  }, [currentchat]);

  const sendtext = useCallback(
    async (textmsg, sender, currentchatid, settextmsg) => {
      if (!textmsg) return alert("you must type sth");

      const response = await postReq(`${messageUrl}/createMessage`, {
        chatId: currentchatid,
        text: textmsg,
        senderId: sender._id,
      });
      console.log("text sent response ", response);
      setnewmessage(response);
    },
    []
  );

  return (
    <ChatContext.Provider
      value={{
        userChats,
        message,
        currentchat,
        sendtext,
        updatecurrentchat,
        createChat,
        userChatError,
        isUserChatLoading,
        thisChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
