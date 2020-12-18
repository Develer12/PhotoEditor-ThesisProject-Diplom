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
  const { getEdited, addPreset } = useBetween(EditedImgStorage);
  const { loading, request, error, clearError } = Ajax();


  const closeDropDown = () => { 
    setDropDown(!dropDown);
  };

  const uploadPreset = async (form) => {
    form.preventDefault();
    try {
      let formData = new FormData(form.target);
      
        if(!!formData.get('name')){ 
          const picIndx = icoChoosen.indx;      
          let settings = getEdited(picIndx); 
          if(!!!settings) {
            throw new Error('Apply settings to create preset');
          }
          settings = settings.settings;

          formData.append('preset', JSON.stringify(settings));
          const data = await request('/api/editor/preset/set', 'POST', 'multipart/form-data', formData);
          if(!!data) {
            console.log(data)
            addPreset(data.name, data.settings);
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
            name='Save preset...' 
            header='Import images' 
            onClick={ closeDropDown.bind(this) }
          >
            <div className='content'>
              <div>
                Preset is saved for your account image settings.
              </div>
              <div>
                Input name of preset, if this name is exists your preset will be rewrited.
              </div>
              <br/>
              <div className='account-div'>
                <form onSubmit={ uploadPreset } className="spotlight style1 bottom cta" >
                  <input type='text' name='name' placeholder='Preset name' className='col-8 col-12-xsmall'/><br/>
                  <input type='submit' value='Save' className='col-4 col-12-xsmall'/>
                </form>
              </div>
            </div>
          </PopupModal>
          {/*<div className='menu-item'>item 3</div>*/}
        </div>
      }
  </li>
  );
}

export default Edit;