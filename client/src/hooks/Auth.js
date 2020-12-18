import { useState, useCallback, useEffect } from 'react';

const storageName = 'DiplomAppUserToken';

export const Auth = () => {
  const [ token, setToken ] = useState(null);
  const [ ready, setReady ] = useState(false);
  const [ userId, setUserId ] = useState(null);
  const [ isAdmin, setIsAdmin ] = useState(false);

  const login = useCallback((jwtToken, id, admin = false) => {
    setToken(jwtToken);
    setUserId(id);
    setIsAdmin(admin);

    localStorage.setItem(storageName, JSON.stringify({
      userId: id, token: jwtToken, isAdmin: admin
    }));
  }, []);


  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setIsAdmin(false);

    window.location.href = '/login';
    
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(data.token, data.userId, data.isAdmin);
    }
    setReady(true);
  }, [login]);


  return { login, logout, token, userId, isAdmin, ready };
}
