import React, { useContext } from 'react';
import { AuthContext } from './../../context/AuthContext';
import { Ajax } from './../../hooks/Ajax';

import './Auth.scss';
import './../Main.scss';

function Client() {
  const auth = useContext(AuthContext);
  const { loading, request, error, clearError } = Ajax();


    return (
      <div id="page-wrapper" className='auth-form'>
        <header id="header">
					<h1 id="logo"><a href="/">Editor</a></h1>
					<nav id="nav">
						<ul>
							<li><a href="/">Home</a></li>
              <li><a href="/login" className="button primary">Sign Up</a></li>
						</ul>
					</nav>
				</header>
        <div className='auth-div'>
          <form className="spotlight style1 bottom cta" >
            <input type='text' name='email' placeholder='E-mail' className='col-8 col-12-xsmall' />
            <input type='password' name='password' placeholder='Password' className='col-8 col-12-xsmall' />
            <input type='submit' value='Login' className='col-4 col-12-xsmall' />
          </form>
          <a href='/registration'  >Registration</a>
        </div>
      </div>
    );
}

export default Client;