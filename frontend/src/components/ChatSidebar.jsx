import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../lib/api";
import { initSocket } from "../lib/socket";

/**
 * --------------------------------------------------
 * CHAT SIDEBAR (REALTIME VERSION)
 * --------------------------------------------------
 */

export default function ChatSidebar() {
  const [chats, setChats] = useState([]);
  const socketRef = useRef(null);

  const navigate = useNavigate();
  const { chatId } = useParams();

  /**
   * FETCH CHATS
   */
  const fetchChats = async () => {
    try {
      const res = await api.get("/chats");
      setChats(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * INIT
   */
  useEffect(() => {
    fetchChats();

    socketRef.current = initSocket();

    const socket = socketRef.current;

    /**
     * REALTIME UPDATE FROM SERVER
     * (we will emit this later from backend)
     */
    socket.on("chat_updated", (updatedChat) => {
      setChats((prev) => {
        const exists = prev.find(
          (c) => c.id === updatedChat.id,
        );

        if (!exists) {
          return [updatedChat, ...prev];
        }

        return prev.map((c) =>
          c.id === updatedChat.id
            ? updatedChat
            : c,
        );
      });
    });

    return () => {
      socket.off("chat_updated");
    };
  }, []);

  /**
   * UI
   */
  return (
    <div
      style={{
        width: "300px",
        borderRight: "1px solid #ddd",
        height: "100%",
        overflowY: "auto",
      }}
    >
      <h3 style={{ padding: "10px" }}>
        Chats
      </h3>

      {chats.map((chat) => (
        <div
          key={chat.id}
          onClick={() =>
            navigate(`/chats/${chat.id}`)
          }
          style={{
            padding: "10px",
            cursor: "pointer",
            background:
              Number(chatId) === chat.id
                ? "#f0f0f0"
                : "transparent",
            borderBottom: "1px solid #eee",
          }}
        >
          <div
            style={{ fontWeight: "bold" }}
          >
            {chat.title}
          </div>

          <div
            style={{
              fontSize: "12px",
              color: "#666",
            }}
          >
            {chat.lastMessage ||
              "No messages yet"}
          </div>
        </div>
      ))}
    </div>
  );
}