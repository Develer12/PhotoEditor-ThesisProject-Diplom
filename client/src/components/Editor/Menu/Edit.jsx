import React, { useState } from 'react';
import PopupModal from '../../Basic/PopupModal';
import { Ajax } from './../../../hooks/Ajax';
import { IcoImgStorage } from './../../../hooks/IcoImgStorage';
import { OrigImgStorage } from './../../../hooks/OrigImgStorage';
import { EditedImgStorage } from './../../../hooks/EditedImgStorage';
import { useBetween } from "use-between";


function Edit(props) {
  const [ dropDown, setDropDown ] = useState(false);

  const { icoChoosen } = useBetween(IcoImgStorage);
  const { clearOrig, setOrig } = useBetween(OrigImgStorage);
  const { getEdited } = useBetween(EditedImgStorage);
  const { loading, request, error, clearError } = Ajax();


  const closeDropDown = () => { 
    setDropDown(!dropDown);
  };

  const uploadPreset = async (form) => {
    form.preventDefault();
    try {
      let formData = new FormData(form.target);
        console.log([...formData])

        if(formData){ 
          const picIndx = icoChoosen.indx;      
          let settings = getEdited(picIndx); 
          if(!!!settings) {
            throw new Error('Apply settings to create preset');
          }
          settings = settings.settings;

          formData.append('preset', JSON.stringify(settings));
          const data = await request('/api/editor/preset', 'POST', 'multipart/form-data', formData);
          if(data) {
            console.log(data)
          }
        }
        else{
          throw new Error('Name field is empty');
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
      <div className='menu-item' onClick={ closeDropDown }>Edit</div>
      {
        dropDown && 

        <div className = 'popup-menu'>
          <PopupModal 
            name='Save preset' 
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
              <form onSubmit={ uploadPreset } >
                <input type='text' name='name' value='Preset name'/><br/>
                <input type='submit' value='Save' />
              </form>
            </div>
          </PopupModal>
          <div className='menu-item'>item 3</div>
        </div>
      }
  </li>
  );
}

export default Edit;