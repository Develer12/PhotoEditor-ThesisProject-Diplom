import { useState, useCallback, useEffect } from 'react';

const storageName = 'EditedImgStorage';

export const EditedImgStorage = () => {
  const [editedVal, setEditedVal] = useState([]);
  const [PresetList, setPresetList] = useState([]);
  const [editedChoosen, setEditedChoosen] = useState({ indx: null, name: null });

  const setEdited = useCallback((img, settings) => {
    let data = localStorage.getItem(storageName);
    data = !!!data? [] : JSON.parse(data);

    if(img){
      img.forEach(element => {
        data.push({ pic: element, settings });
        console.log(data)
      });
      localStorage.setItem(storageName, JSON.stringify(data));
      setEditedVal(data);
    }
  }, []);

  const updateEdited = useCallback((pic, indx, settings = null) => {
    let data = JSON.parse(localStorage.getItem(storageName));
    if(pic && data[indx]){
      settings = !!!settings? data[indx].settings : settings;
      data[indx] = { pic, settings };
      localStorage.setItem(storageName, JSON.stringify(data));
      setEditedVal(data);
    }
  }, []);

  useEffect(() => {
    
  }, [editedVal, setEdited]);

  const getEdited = (indx) => {
    let data = JSON.parse(localStorage.getItem(storageName));
    if(data){
      data = data[indx]? data[indx] : null;
      return data;
    }
    return null;
  };

  const getEditedAll = () => {
    let data = JSON.parse(localStorage.getItem(storageName));
    return !!!data? [] : data;
  };

  const deleteEdited = (indx) => {
    let data = JSON.parse(localStorage.getItem(storageName));
    if(data){
      data.splice(indx, 1);
      localStorage.setItem(storageName, JSON.stringify(data));
      setEditedVal(data);
    }
  };

  const clearEdited = () => {
    setEditedVal([]);
    localStorage.removeItem(storageName);
  };

  const addPreset = useCallback((name, settings) => {
    if(!!settings){
      PresetList.push({ name, settings });
      setPresetList(PresetList);
    }
  }, []);


  return { 
    editedChoosen, setEditedChoosen, 
    editedVal, setEditedVal, 
    PresetList, setPresetList,
    setEdited, updateEdited, 
    getEdited, getEditedAll, 
    deleteEdited, clearEdited,
    addPreset
  };
}
