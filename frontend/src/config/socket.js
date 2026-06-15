import { io } from "socket.io-client";

/**
 * --------------------------------------------------
 * SOCKET SINGLETON
 * --------------------------------------------------
 * Prevent multiple socket connections
 */

let socket = null;

/**
 * --------------------------------------------------
 * INIT SOCKET
 * --------------------------------------------------
 */

export const initSocket = () => {
  if (socket) return socket;

  const token = localStorage.getItem(
    "accessToken",
  );

  socket = io(
    import.meta.env.VITE_SOCKET_URL ||
      "http://localhost:5000",
    {
      transports: ["websocket"],
      autoConnect: true,

      auth: {
        token,
      },
    },
  );

  /**
   * CONNECTION EVENTS
   */

  socket.on("connect", () => {
    console.log(
      "Socket connected:",
      socket.id,
    );
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });

  socket.on("connect_error", (err) => {
    console.log(
      "Socket error:",
      err.message,
    );
  });

  return socket;
};

/**
 * --------------------------------------------------
 * GET SOCKET INSTANCE
 * --------------------------------------------------
 */

export const getSocket = () => {
  if (!socket) {
    return initSocket();
  }
  return socket;
};

/**
 * --------------------------------------------------
 * DISCONNECT SOCKET
 * --------------------------------------------------
 */

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};