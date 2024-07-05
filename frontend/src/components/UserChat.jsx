import React, { useEffect, useState } from "react";
import { getReq, baseUrl } from '../utils/services.js'; // Adjust the import path as needed

function UserChat({ chat, user }) {
  const [otherUser, setOtherUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOtherUser = async () => {
      const currentUserId = user?.data.user._id;
      const otherUserId = chat.members.find(id => id !== currentUserId);

      console.log("Current user ID:", currentUserId);
      console.log("Other user ID:", otherUserId);

      if (!otherUserId) {
        setError("Could not find other user in chat");
        setLoading(false);
        return;
      }

      try {
        const response = await getReq(`${baseUrl}/find/${otherUserId}`);
        console.log("Fetch other user response:", response);

        if (response.ok) {
          setOtherUser(response.data);
        } else {
          setError(response.error || "Failed to fetch other user");
        }
      } catch (err) {
        console.error("Error fetching other user:", err);
        setError("An error occurred while fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchOtherUser();
  }, [chat, user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!otherUser) {
    return <div>No user found</div>;
  }

  return (
    <div className="user-chat-container">
      <div className="chatuser">{otherUser.data.userName}</div>
      <div className="chatmessage">Last message here</div>
      <span className="colored-circle"></span>
    </div>
  );
}

export default UserChat;