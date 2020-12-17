import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { AuthContext } from './context/AuthContext';
import { Auth } from './hooks/Auth';
import { Routes } from './Routes';

function App() {
  const { token, login, logout, userId, ready } = Auth();
  const isAuthenticated = !!token;
  const routes = Routes(isAuthenticated);
    
  if (!ready) {
    return 0;
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <Router>
        <div className='App'>
          { isAuthenticated }
          { routes }
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
