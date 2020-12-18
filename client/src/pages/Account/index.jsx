import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

import Admin from './Admin';
import Client from './Client';

import './../Main.scss';
import './Account.scss';

function Account() {
  const auth = useContext(AuthContext);
  const isAdmin = auth.isAdmin;

  const Logout = () => {
		auth.logout();
  } 
  
    return (
      <div id="page-wrapper" className='account-form'>
        <header id="header">
          <h1 id="logo"><a href="/">Editor</a></h1>
          <nav id="nav">
            <ul>
              <li><a href='/editor'>Try Editor</a></li>
              <li><a onClick={ Logout.bind(this) } className='button primary'>Logout</a></li>
            </ul>
          </nav>
        </header>

        <div id="main" className="wrapper style1">
          { isAdmin && <Admin/> }
          { !isAdmin && <Client/> }
        </div>
      </div>
      
    );
}

export default Account;