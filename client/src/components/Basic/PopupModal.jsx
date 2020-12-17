import React from 'react';
import Popup from 'reactjs-popup';
import './PopupModal.scss';

const contentStyle = {
  maxWidth: '600px',
  width: '90%',
};

function PopupModal(props) {

  return (
    <Popup 
      modal 
      nested 
      onClose = { () => { props.onClick() } }
      contentStyle = { contentStyle }
      trigger = { <div className='menu-item'>{ props.name }</div> }
    >
      { close => (
          <div className='modal'>
            <a className='close' onClick={ close }>&times;</a>
            <div className='header'> { props.header } </div>
            { props.children }
          </div>
      )}
    </Popup>
  );
}

export default PopupModal;
