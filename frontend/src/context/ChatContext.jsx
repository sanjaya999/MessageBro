import { createContext, useState , useEffect} from "react";
import { baseUrl ,getReq , postReq } from "../utils/services.js";


export const ChatContext = createContext();

export const ChatContextProvider = ({children , user})=>{
     const [userChats , setuserChats] = useState(null)
     const [isuserChatLoading , setisuserChatLoading] = useState(false);
     const [userChatError , setuserChatError] = useState(null);
     
        useEffect(() => {
            const getUserChats = async()=>{
                console.log("this is user " ,user?.data.user._id);

                if(user?.data.user._id){
                    setisuserChatLoading(true)
                    setuserChatError(null)
                    console.log("this is user " ,user?.data.user._id);
                    const response = await getReq(`http://localhost:9001/api/v1/chat/finduserchat/${user?.data.user._id}`)
                    
                    setisuserChatLoading(false)

                
                if(response.error){
                    return setuserChatError(response.data);
                
            }
                setuserChats(response.data)

            }}
            getUserChats();
        }, [user]);
    
     return <ChatContext.Provider value={{userChats , 
        userChatError,
        isuserChatLoading
     
     }}>
        {children}
     </ChatContext.Provider>
}
