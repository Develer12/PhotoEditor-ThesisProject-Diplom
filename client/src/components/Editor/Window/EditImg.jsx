import React, { useContext, useRef } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { OrigImgContext } from './../../../context/OrigImgContext';


function EditImg(props) {
  const imgRef = useRef(null);
  let img = '/logo512.png';
  if(props.pic != null){
    const pic = props.pic.pic;
    img = `data:${ pic.mime };base64,${ pic.img }`;
    imgRef.current.className = pic.size[0] > pic.size[1]? 'width' : 'long';
  }

  return (
    <div className='edit-img'>
      <TransformWrapper>
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <React.Fragment>
            <div className="tools">
              <button onClick={ zoomIn }>+</button>
              <button onClick={ zoomOut }>-</button>
              <button onClick={ resetTransform }>x</button>
            </div>
            <TransformComponent>
              <img className='long' ref={ imgRef } src={ img } alt=""></img>
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
    </div>
  );
}

export default EditImg;
