import { useState, useCallback, useContext } from 'react';
import { AuthContext } from './../context/AuthContext';

export const Ajax = () => {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const { token } = useContext(AuthContext);

  const request = useCallback(async (
    url, 
    method = 'GET', 
    contentType = 'application/json',
    body = null, 
    headers = {}
  ) => {
    setLoading(true);

    try {
      if(body) {
        if(contentType !== 'multipart/form-data') {
          body = JSON.stringify(body);
          headers['Content-Type'] = contentType;
        }
      }

      headers.Authorization = !!token? `user ${token}` : null;
      
      const response = await fetch(url, { method, body, headers });
      const data = response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something wrong');
      }
      //alert('done')


      setLoading(false);

      return data;
    } 
    catch (e) {
      setLoading(false);
      setError(e.message);
      throw e;
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
}
