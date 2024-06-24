import { useEffect, useState } from "react";
import { baseUrl, getReq } from "../src/utils/services";

export const userFetch = (chat, user) => {
    const [fetchUser, setFetchUser] = useState(null);
    const [error, setError] = useState(null);

    const recipientId = chat?.members?.find((id) => id !== user?.id);
    
    useEffect(() => {
        const getUser = async () => {
            if (!recipientId) {
                return null;
            }
            console.log("yo chai getuser bhitra" , recipientId);
            try {
                const response = await getReq(`${baseUrl}/find/${recipientId}`);
                console.log("this is response after findng", response);
                
                    setFetchUser(response);
                    console.log("this is from fetch user" , fetchUser);

                
            } catch (err) {
                console.log("error at userfetch.js")
            }
        };
        getUser()
    }, []); // Changed dependency to recipientId

    return {  fetchUser,error };
};