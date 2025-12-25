import { useState } from "react";
import { TOKEN_KEY_NAME } from "./values";

function useToken() {
  const [token, setState] = useState(() => {
    return localStorage.getItem(TOKEN_KEY_NAME);
  });

  const setToken = (value: string) =>
    setState(() => {
      localStorage.setItem(TOKEN_KEY_NAME, value);
      return value;
    });

  return { token, setToken };
}

export default useToken;
