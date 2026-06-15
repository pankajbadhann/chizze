import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import api from "../lib/api";
import { initSocket } from "../config/socket";

/**
 * --------------------------------------------------
 * CHAT ROOM (PRODUCTION SAFE REALTIME VERSION)
 * --------------------------------------------------
 */

export default function ChatRoom() {
  const { chatId } = useParams();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  const socketRef = useRef(null);

  /**
   * MESSAGE DEDUP MAP (IMPORTANT FIX)
   */
  const messageIds = useRef(new Set());

  /**
   * INIT SOCKET
   */
  useEffect(() => {
    socketRef.current = initSocket();

    return () => {
      // socket stays singleton; no disconnect here
    };
  }, []);

  /**
   * FETCH INITIAL MESSAGES
   */
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);

        const res = await api.get(
          `/messages/${chatId}`,
        );

        const data = res.data.data || [];

        /**
         * register existing messages in dedup set
         */
        data.forEach((m) => {
          messageIds.current.add(m.id);
        });

        setMessages(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (chatId) fetchMessages();
  }, [chatId]);

  /**
   * JOIN + LISTEN SOCKET
   */
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket || !chatId) return;

    socket.emit("join_chat", chatId);

    const handleMessage = (msg) => {
      /**
       * IMPORTANT: dedup check
       */
      if (msg.id && messageIds.current.has(msg.id)) {
        return;
      }

      if (msg.id) {
        messageIds.current.add(msg.id);
      }

      setMessages((prev) => [...prev, msg]);
    };

    socket.on("receive_message", handleMessage);

    return () => {
      socket.off("receive_message", handleMessage);
    };
  }, [chatId]);

  /**
   * SEND MESSAGE
   */
  const sendMessage = () => {
    const socket = socketRef.current;

    if (!socket || !input.trim()) return;

    const tempId = Date.now(); // temporary id

    const message = {
      id: tempId,
      chatId,
      content: input,
      position: "right",
      temp: true,
    };

    /**
     * OPTIMISTIC UPDATE (ONLY ONCE)
     */
    messageIds.current.add(tempId);
    setMessages((prev) => [...prev, message]);

    socket.emit("send_message", message);

    setInput("");
  };

  /**
   * UI
   */
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          borderBottom: "1px solid #ddd",
          padding: "10px",
        }}
      >
        <h3>Chat #{chatId}</h3>
      </div>

      {/* MESSAGES */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "10px",
        }}
      >
        {loading && <p>Loading...</p>}

        {messages.map((msg) => (
          <div
            key={msg.id || Math.random()}
            style={{
              marginBottom: "10px",
              textAlign:
                msg.position === "right"
                  ? "right"
                  : "left",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: "10px",
                background:
                  msg.position === "right"
                    ? "#DCF8C6"
                    : "#f1f1f1",
                opacity: msg.temp ? 0.6 : 1,
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div
        style={{
          display: "flex",
          borderTop: "1px solid #ddd",
          padding: "10px",
        }}
      >
        <input
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          placeholder="Type message..."
          style={{
            flex: 1,
            padding: "8px",
          }}
        />

        <button
          onClick={sendMessage}
          style={{ marginLeft: "10px" }}
        >
          Send
        </button>
      </div>
    </div>
  );
}