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

  const { icoVal, setIco, getIcoAll, clearIco, icoChoosen } = useBetween(IcoImgStorage);
  const { clearOrig, setOrig } = useBetween(OrigImgStorage);
  const { clearEdited, setEdited, getEdited } = useBetween(EditedImgStorage);
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

  const DownloadFile = () => {
    let picIndx = icoChoosen.indx;
    let pic = getEdited(picIndx);
    console.log(pic)
    if(!!pic) {
      pic = pic.pic;
      const linkSource = `data:${ pic.mime };base64,${ pic.img }`;
      const downloadLink = document.createElement('a');
      document.body.appendChild(downloadLink);
      downloadLink.href = linkSource;
      downloadLink.target = '_self';
      downloadLink.download = pic.name;
      downloadLink.click(); 
    }
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
                Upload image for input it to flow.
              </div>
              <div>
                Max count images on the flow is 15.
              </div>
              <br/>
              <div className='account-div'>
                <form onSubmit={ uploadFile } className="spotlight style1 bottom cta" >
                  <input type='file' accept=".jpeg, .jpg, .png, .gif" name='files' className='col-8 col-12-xsmall' multiple required /><br/>
                  <input type='submit' className='col-4 col-12-xsmall' />
                </form>
              </div>
            </div>
          </PopupModal>
          <div className='menu-item' onClick={ ClearAll } >Clear</div>
          <div className='menu-item' onClick={ DownloadFile } >Download</div>
          <img src={ upload } />
        </div>
      }
  </li>
  );
}

export default File;