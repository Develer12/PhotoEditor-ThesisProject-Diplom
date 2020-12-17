import React, { useRef } from 'react';
import { useBetween } from "use-between";
import { IcoImgStorage } from './../../../hooks/IcoImgStorage';
import { OrigImgStorage } from './../../../hooks/OrigImgStorage';
import { EditedImgStorage } from './../../../hooks/EditedImgStorage';


function MinImg(props) {
  let indx = props.indx;
  let style = props.choosen === true? 'img-body choosen' : 'img-body';
  const picRef = useRef(null);
  const pic = props.pic;

  const { setIcoChoosen, deleteIco } = useBetween(IcoImgStorage);
  const { deleteOrig } = useBetween(OrigImgStorage);
  const { deleteEdited } = useBetween(EditedImgStorage);

  const choosePic = () => {
    setIcoChoosen({ indx, name: pic.name });
  }

  const deletePic = () => {
    deleteIco(indx);
    deleteOrig(indx);
    deleteEdited(indx);
  };

  return (
    <div className={ style } ref={ picRef } onClick={ choosePic }>
      <a className='close' onClick={ deletePic }>&times;</a>
      <img  src={ `data:${ pic.mime };base64,${ pic.img }` } />
    </div>
  );
}


export default MinImg;