import { useContext, useState } from 'react';
import { UserContext } from '../contexts/User';

function Auth({ children }) {
  const user = useContext(UserContext);
  console.log('from auth', user);
  const [currentUser, setCurrentUser] = useState(user.currentUser);
  if (!currentUser?.id) {
    user.login(setCurrentUser);
    return <div>checking credentials...</div>;
  }
  return (
    <UserContext.Provider currentuser={currentUser}>
      {children}
    </UserContext.Provider>
  );
}

export default Auth;
