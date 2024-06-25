import { createContext, useState, useEffect } from "react";
import { baseUrl, getReq, postReq } from "../utils/services.js";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setuserChats] = useState(null);
  const [isuserChatLoading, setisuserChatLoading] = useState(false);
  const [userChatError, setuserChatError] = useState(null);
  const [thischat, setthischat] = useState(null);

  useEffect(() => {
    const getchats = async () => {
      const response = await getReq(`${baseUrl}/findall`);
      console.log("this is getchats", response);
    };
    getchats();
  }, []);

  useEffect(() => {
    const getUserChats = async () => {
      let userID = user?.data.user._id;
      if (userID) {
        setisuserChatLoading(true);
        setuserChatError(null);
        console.log("this is chatcontext id ", user?.data.user._id);
        const response = await getReq(
          `http://localhost:9001/api/v1/chat/finduserchat/${userID}`
        );
        console.log("this is response in chatcontext", response);
        setisuserChatLoading(false);

        if (response.error) {
          return setuserChatError(response.data);
        }
        setuserChats(response.data);
      }
    };
    getUserChats();
  }, [user]);

  return (
    <ChatContext.Provider
      value={{ userChats, userChatError, isuserChatLoading }}
    >
      {children}
    </ChatContext.Provider>
  );
};
