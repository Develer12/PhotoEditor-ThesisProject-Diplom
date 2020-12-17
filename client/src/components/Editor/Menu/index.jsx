import React from 'react';
import File from './File';
import Edit from './Edit';
import Burg from './../Burg';
import './Menu.scss';


function Menu() {
  return (
    <div className='edit-menu'>
      <ul>
        <File name='File'/>
        <Edit name='Edit'/>
      </ul>
      <ul>
        <li><a href='/account'>Account</a></li>
      </ul>
    </div>
  );
}

export default Menu;
