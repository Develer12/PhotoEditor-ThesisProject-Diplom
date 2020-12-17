import React, { useState } from 'react';
import PopupModal from '../../Basic/PopupModal';
import { Ajax } from './../../../hooks/Ajax';
import { IcoImgStorage } from './../../../hooks/IcoImgStorage';
import { OrigImgStorage } from './../../../hooks/OrigImgStorage';
import { EditedImgStorage } from './../../../hooks/EditedImgStorage';
import { useBetween } from "use-between";


function File(props) {
  const [ dropDown, setDropDown ] = useState(false);
  const [ upload, setUpload ] = useState(null);

  const { icoVal, setIco, getIcoAll, clearIco, setIcoVal } = useBetween(IcoImgStorage);
  const { clearOrig, setOrig } = useBetween(OrigImgStorage);
  const { clearEdited, setEdited } = useBetween(EditedImgStorage);
  const { loading, request, error, clearError } = Ajax();


  const closeDropDown = () => { 
    setDropDown(!dropDown);
  };

  const ClearAll = () => {
    clearIco();
    clearOrig();
    clearEdited();
  };

  const uploadFile = async (form) => {
    form.preventDefault();
    try {
      let formData = new FormData(form.target);

        if(formData){          
          if((getIcoAll().length + [...formData].length) > 15) {
            throw new Error('Too much photos');
          }

          const data = await request('/api/editor/upload', 'POST', 'multipart/form-data', formData);
          if(data) {
            setIco(data.ico);
            setOrig(data.orig);
            setEdited(data.orig, {});
          }
        }
        else{
          throw new Error('Upload the photos');
        }
      } 
      catch (e) {
        console.log(e.message)
      }
      finally{
        closeDropDown();
      }
    return false;
  }

  return (
    <li className='menu-item-li'>
      <div className='menu-item' onClick={ closeDropDown }>File</div>
      {
        dropDown && 

        <div className = 'popup-menu'>
          <PopupModal 
            name='Import...' 
            header='Import images' 
            onClick={ closeDropDown.bind(this) }
          >
            <div className='content'>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a
                nostrum. Dolorem, repellat quidem ut, minima sint vel eveniet
                quibusdam voluptates delectus doloremque, explicabo tempore dicta
                adipisci fugit amet dignissimos?
              </div>
              <br/>
              <form onSubmit={ uploadFile } >
                <input type='file' accept=".jpeg, .jpg, .png, .gif" name='files' multiple required /><br/>
                <input type='submit' value='Upload' />
              </form>
            </div>
          </PopupModal>
          <div className='menu-item' onClick={ ClearAll } >Clear</div>
          <div className='menu-item'>item 3</div>
          <img src={ upload } />
        </div>
      }
  </li>
  );
}

export default File;