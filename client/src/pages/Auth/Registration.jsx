import React from 'react';
import { Ajax } from './../../hooks/Ajax';

import './Auth.scss';
import './../Main.scss';

function Registration() {
  const { loading, request, error, clearError } = Ajax();

  const regClick = async (form) => {
    form.preventDefault();
    try {
      let formData = new FormData(form.target);

      form = {};
      formData.forEach((value, key) => { 
        form[key] = value;
          if(!value){
            throw new Error(`${key} is empty`);
          }
      });

      if(form.password === form.password2){
        const data = await request('/api/auth/registration', 'POST', 'application/json', {...form});
        window.location.href = '/login';
      }
      else{
        alert('wrong pass')
      }

    } 
    catch (e) {
      console.log('err ' + e.message);
    }

    return false;
}


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
      <form onSubmit={ regClick } className="spotlight style1 bottom cta" >
      <input type='text' name='email' placeholder='E-mail' className='col-8 col-12-xsmall' />
        <input type='password' name='password' placeholder='Password' className='col-8 col-12-xsmall' />
        <input type='password' name='password2' placeholder='Password repeat' className='col-8 col-12-xsmall' />
        <input type='text' name='fName' placeholder='First Name' className='col-8 col-12-xsmall' />
        <input type='text' name='sName' placeholder='Second Name' className='col-8 col-12-xsmall' />
        <input type='submit' value='Registration' className='col-4 col-12-xsmall' />
      </form>
    </div>
    </div>
  );
}

export default Registration;
