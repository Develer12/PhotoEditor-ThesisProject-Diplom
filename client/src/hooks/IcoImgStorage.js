import { useState, useCallback, useEffect } from 'react';

const storageName = 'IcoImgStorage';

export const IcoImgStorage = () => {
  const [icoVal, setIcoVal] = useState([]);
  const [icoChoosen, setIcoChoosen] = useState({ indx: null, name: null });

  const setIco = useCallback((img) => {
    let data = localStorage.getItem(storageName);
    data = !!!data? [] : JSON.parse(data);

    if(img){
      img.forEach(element => {
        data.push({ pic: element });
      });
      localStorage.setItem(storageName, JSON.stringify(data));
    }
    setIcoVal(data);
  }, []);

  useEffect(() => {
    
  }, [icoVal, setIco]);

  const getIco = (indx) => {
    let data = JSON.parse(localStorage.getItem(storageName));
    if(data){
      data = data[indx]? data[indx] : null;
      return data;
    }
    return null;
  };

  const getIcoAll = () => {
    let data = JSON.parse(localStorage.getItem(storageName));
    return !!!data? [] : data;
  };

  const clearIco = () => {
    setIcoVal([]);
    localStorage.removeItem(storageName);
  };

  const deleteIco = (indx) => {
    let data = JSON.parse(localStorage.getItem(storageName));
    if(data){
      data.splice(indx, 1);
      localStorage.setItem(storageName, JSON.stringify(data));
      setIcoVal(data);
    }
  };


  return { 
    icoChoosen, setIcoChoosen, 
    icoVal, setIcoVal,
    setIco, 
    getIco, getIcoAll, 
    deleteIco, clearIco
  };
}
