import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../lib/api";
import ROUTES from "../config/routes";

/**
 * --------------------------------------------------
 * CHAT LAYOUT (SHELL)
 * --------------------------------------------------
 * - Sidebar (chat list)
 * - Main chat area
 * - Future socket integration ready
 */

export default function ChatLayout({
  children,
}) {
  const navigate = useNavigate();

  const [chats, setChats] = useState([]);
  const [loading, setLoading] =
    useState(true);

  const [selectedChat, setSelectedChat] =
    useState(null);

  /**
   * FETCH CHATS
   */

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await api.get(
          "/chats",
        );

        setChats(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  /**
   * SELECT CHAT
   */

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);

    navigate(
      ROUTES.CHAT(chat.id),
    );
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
      }}
    >
      {/* SIDEBAR */}
      <div
        style={{
          width: "300px",
          borderRight: "1px solid #ddd",
          padding: "10px",
        }}
      >
        <h3>Chats</h3>

        {loading && <p>Loading...</p>}

        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() =>
              handleSelectChat(chat)
            }
            style={{
              padding: "10px",
              cursor: "pointer",
              background:
                selectedChat?.id ===
                chat.id
                  ? "#eee"
                  : "transparent",
            }}
          >
            {chat.title}
          </div>
        ))}
      </div>

      {/* MAIN CHAT AREA */}
      <div
        style={{
          flex: 1,
          padding: "10px",
        }}
      >
        {children}
      </div>
    </div>
  );
}