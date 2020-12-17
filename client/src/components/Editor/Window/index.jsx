import React from 'react';
import { useBetween } from "use-between";
import Skip from './../Skip';
import EditSettings from './EditSettings';
import EditImg from './EditImg';
import { IcoImgStorage } from './../../../hooks/IcoImgStorage';
import { OrigImgStorage } from './../../../hooks/OrigImgStorage';
import { EditedImgStorage } from './../../../hooks/EditedImgStorage';


function Window() {
  const { icoChoosen } = useBetween(IcoImgStorage);
  const { getEdited } = useBetween(EditedImgStorage);
  const { getOrig } = useBetween(OrigImgStorage);

  let imgEdited = getEdited(icoChoosen.indx);
  let imgOrig = getOrig(icoChoosen.indx);
  let settings = imgEdited === null? {} : imgEdited.settings;

  return (
    <div className='edit-window'>
      <EditImg pic={ imgEdited } />
      <EditSettings 
        settings = { settings }
        pic={ imgOrig } 
        indx={ icoChoosen.indx } 
        icoChoosen={ !!icoChoosen.name } 
      />
    </div>
  );
}

export default Window;
