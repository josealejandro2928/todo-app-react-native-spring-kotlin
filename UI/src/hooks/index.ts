import { useEffect, useState } from 'react';
import { User } from '../classes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useUser = () => {
  const [user, setUser] = useState<User | null | undefined>();
  const [token, setToken] = useState<string>(null);
  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const userStr = await AsyncStorage.getItem('user');
      setUser(JSON.parse(userStr));
    } catch (e) {
      setUser(null);
    }
  }

  useEffect(() => {
    console.log('user: ', user);
    setToken(token);
  }, [user]);

  const setLoggedUser = async (user: User | null) => {
    await AsyncStorage.setItem('user', user ? JSON.stringify(user) : '');
    setUser(user);
  };

  return { user, setLoggedUser, token };
};
