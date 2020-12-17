import { useState, useCallback, useEffect } from 'react';

const storageName = 'EditedImgStorage';

export const EditedImgStorage = () => {
  const [editedVal, setEditedVal] = useState([]);
  const [editedChoosen, setEditedChoosen] = useState({ indx: null, name: null });

  const setEdited = useCallback((img, settings, filters = null) => {
    let data = localStorage.getItem(storageName);
    data = !!!data? [] : JSON.parse(data);

    if(img){
      img.forEach(element => {
        data.push({ pic: element, settings
          //, filters 
        });
        console.log(data)
      });
      localStorage.setItem(storageName, JSON.stringify(data));
    }
    setEditedVal(data);
  }, []);

  const updateEdited = useCallback((pic, indx, settings = null, filters = null) => {
    let data = JSON.parse(localStorage.getItem(storageName));
    if(pic && data[indx]){
      settings = !!!settings? data[indx].settings : settings;
      filters = !!!filters? data[indx].filters : filters;
      console.log(filters)
      data[indx] = { pic, settings
        //, filters 
      };
      localStorage.setItem(storageName, JSON.stringify(data));
    }
    setEditedVal(data);
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


  return { 
    editedChoosen, setEditedChoosen, 
    editedVal, setEditedVal, 
    setEdited, updateEdited, 
    getEdited, getEditedAll, 
    deleteEdited, clearEdited 
  };
}
