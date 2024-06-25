import React from "react";
import { userFetch } from "../../hooks/userFetch.js";

function UserChat({ chat, user }) {
  const { fetchUser } = userFetch(chat, user);
  console.log("this is userchat id", fetchUser);

  return (
    <>
      <div className="chatuser">{fetchUser?.data.data.userName}</div>

      <div className="chatmessage">Here Message</div>

      <span className="colored-circle"></span>
    </>
  );
}

export default UserChat;
