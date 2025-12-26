import { TOKEN_KEY_NAME } from "./values";

export const setToken = (value: string) =>
  localStorage.setItem(TOKEN_KEY_NAME, value);

export const getToken = () => localStorage.getItem(TOKEN_KEY_NAME);
