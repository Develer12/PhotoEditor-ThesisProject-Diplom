import { useState, useCallback, useEffect } from 'react';

const storageName = 'DiplomAppUserToken';

export const Auth = () => {
  const [ token, setToken ] = useState(null);
  const [ ready, setReady ] = useState(false);
  const [ userId, setUserId ] = useState(null);
  //localStorage.removeItem(storageName);

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(storageName, JSON.stringify({
      userId: id, token: jwtToken
    }));
  }, []);


  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);

    window.location.href = '/login';
    
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(data.token, data.userId);
    }
    setReady(true);
  }, [login]);


  return { login, logout, token, userId, ready };
}
