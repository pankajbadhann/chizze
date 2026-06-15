const socketAsyncHandler = (fn) => {
  return async (...args) => {
    const socket = args[0];
    const next = args[args.length - 1];

    try {
      await fn(...args);
    } catch (error) {
      console.error("Socket error:", error);
      if (socket?.emit) {
        socket.emit("error", {
          message: "Internal socket error",
        });
      }
      if (typeof next === "function") next(error);
    }
  };
};

module.exports = socketAsyncHandler;