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
      try {
        const response = await getReq(`${baseUrl}/find/${recipientId}`);
        console.log("this is response after findng", response);

        setFetchUser(response);
      } catch (err) {
        console.log("error at userfetch.js");
      }
    };
    getUser();
  }, [recipientId]); // Changed dependency to recipientId

  return { fetchUser, recipientId,error };
};
