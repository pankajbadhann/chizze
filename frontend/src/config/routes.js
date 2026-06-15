/**
 * --------------------------------------------------
 * APPLICATION ROUTES
 * --------------------------------------------------
 * Single source of truth.
 * Avoid hardcoded routes throughout app.
 */

export const ROUTES = {
  HOME: "/",

  LOGIN: "/login",

  REGISTER: "/register",

  CHATS: "/chats",

  CHAT: (chatId = ":chatId") =>
    `/chats/${chatId}`,
};

export default ROUTES;