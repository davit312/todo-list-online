import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "./User";

const allowedForUsers = ["/"];
const notAllowedForUsers = ["/login", "/register"];

export default function UserProvider({ children }) {
  const navigate = useNavigate();

  const DefaultUser = {
    currentUser: undefined,
  };

  // const login = function () {};

  const logout = function () {
    const token = localStorage.getItem("userToken");
    window.localStorage.removeItem("userToken");
    const newUser = { ...user, currentUser: undefined };
    setCurrentUser(newUser);
    fetch("http://localhost:3000/api/logout", {
      method: "POST",
      body: JSON.stringify({ token: token }),
      headers: {
        "x-auth": token,
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      })
      .finally(() => {
        navigate("/login", { replace: true });
      });
  };

  const putCurrentUser = function (userupdate) {
    const newUser = { ...user, currentUser: userupdate };
    setCurrentUser(newUser);
    console.log("updated", user);
  };

  const token = window.localStorage.getItem("userToken");

  const [user, setCurrentUser] = useState(DefaultUser);

  useEffect(() => {
    const pathname = window.location.pathname;
    if (!user.currentUser?.id) {
      if (token) {
        let newUser = {};

        fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
          }),
        })
          .then((res) => res.json())
          .then((json) => {
            if (json.error) {
              return logout();
            }
            newUser = { ...user, currentUser: json.user };
            setCurrentUser(newUser);
          })
          .finally(() => {
            if (allowedForUsers.includes(pathname) && !newUser.currentUser.id) {
              navigate("/login", { replace: true });
            }
            if (
              notAllowedForUsers.includes(pathname) &&
              newUser.currentUser.id
            ) {
              navigate("/", { replace: true });
            }
          });
      } else {
        if (allowedForUsers.includes(pathname)) {
          navigate("/login", { replace: true });
        }
      }
    }
  }, [navigate, token, user]);

  const exportList = {
    user: user.currentUser,
    putCurrentUser,
    logout,
  };

  return (
    <UserContext.Provider value={exportList}>{children}</UserContext.Provider>
  );
}
