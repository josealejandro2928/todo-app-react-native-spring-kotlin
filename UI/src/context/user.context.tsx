import { User } from '../classes';
import { useUser } from '../hooks';

import React, { createContext } from 'react';

interface UserContextType {
  user: User | null | undefined;
  setLoggedUser: (user: User | null) => void;
  token: string;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider = ({ children }) => {
  const { user, setLoggedUser, token } = useUser();

  return (
    <UserContext.Provider value={{ user, setLoggedUser, token }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
