import React from 'react';

import { Menu, Package, Window, Burg } from './../components/Editor';

import './Editor.scss';


function Editor() {

  return (
    <div className='edit-container'>
      <Menu />
      <Burg/>
      <Window/>
      <Package />
    </div>
  );
}

export default Editor;
