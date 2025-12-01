import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from './User';

const allowForUsers = ['/'];

export default function UserProvider({ children }) {
  const navigate = useNavigate();

  const DefaultUser = {
    currentUser: undefined,
  };

  // const login = function () {};

  const logout = function () {
    window.localStorage.removeItem('userToken');
    const newUser = { ...user, currentUser: undefined };
    setCurrentUser(newUser);
    navigate('/login', { replace: true });
  };

  const putCurrentUser = function (userupdate) {
    const newUser = { ...user, currentUser: userupdate };
    setCurrentUser(newUser);
    console.log('updated', user);
  };

  const token = window.localStorage.getItem('userToken');

  const [user, setCurrentUser] = useState(DefaultUser);

  useEffect(() => {
    const pathname = window.location.pathname;
    if (allowForUsers.includes(pathname)) {
      if (!user.currentUser?.id) {
        if (token) {
          const body = {
            token: token,
          };

          fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          })
            .then((res) => res.json())
            .then((json) => {
              if (json.error) {
                return navigate('/login', { replace: true });
              }
              const newUser = { ...user, currentUser: json.user };
              setCurrentUser(newUser);
            });
        } else {
          navigate('/login', { replace: true });
        }
      }
    }
  }, [navigate, token, user]);

  const exportList = {
    user,
    putCurrentUser,
    logout,
  };

  return (
    <UserContext.Provider value={exportList}>{children}</UserContext.Provider>
  );
}
