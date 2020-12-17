import React from 'react';
import { IcoImgStorage } from './../../../hooks/IcoImgStorage';
import { useBetween } from "use-between";
import MinImg from './MinImg';

function Package() {
  const { icoChoosen, icoVal, getIcoAll } = useBetween(IcoImgStorage);

  return (
    <div className='edit-package'>
        <div className = 'flow'>
          { icoVal && getIcoAll().map((object, index) => {
            let choosen = index === icoChoosen.indx? true : false;

            return (
              <MinImg key={ `key_${object.pic.name}` } choosen={ choosen } pic = { object.pic } indx={ index } />
            )
          })}
        </div>
    </div>
  );
}


export default Package;
