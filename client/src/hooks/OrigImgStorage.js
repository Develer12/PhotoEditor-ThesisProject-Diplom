import { useState, useCallback, useEffect } from 'react';

const storageName = 'OrigImgStorage';

export const OrigImgStorage = () => {
  const [origVal, setOrigVal] = useState([]);
  const [origChoosen, setOrigChoosen] = useState({ indx: null, name: null });

  const setOrig = useCallback((img) => {
    let data = localStorage.getItem(storageName);
    data = !!!data? [] : JSON.parse(data);

    if(img){
      img.forEach(element => {
        data.push({ pic: element });
      });
      localStorage.setItem(storageName, JSON.stringify(data));
    }
    setOrigVal(data);
  }, []);

  useEffect(() => {
    
  }, [origVal, setOrig]);

  const getOrig = (indx) => {
    let data = JSON.parse(localStorage.getItem(storageName));
    if(data){
      data = data[indx]? data[indx] : null;
      return data;
    }
    return null;
  };

  const getOrigAll = () => {
    let data = JSON.parse(localStorage.getItem(storageName));
    return !!!data? [] : data;
  };

  const deleteOrig = (indx) => {
    let data = JSON.parse(localStorage.getItem(storageName));
    if(data){
      data.splice(indx, 1);
      localStorage.setItem(storageName, JSON.stringify(data));
      setOrigVal(data);
    }
  };

  const clearOrig = () => {
    setOrigVal([]);
    localStorage.removeItem(storageName);
  };


  return { 
    origChoosen, setOrigChoosen, 
    origVal, setOrigVal, 
    setOrig, 
    getOrig, getOrigAll, 
    deleteOrig, clearOrig 
  };
}
