import { useState, useCallback, useEffect } from 'react';

const storageName = 'RangeSliderImgStorage';

export const RangeSliderStorage = () => {
  const [rangeSliderVal, setRangeSliderVal] = useState({});
  const [rangeSliderChoosen, setRangeSliderChoosen] = useState({ indx: null, name: null });

  const setRangeSlider = useCallback((img, settings) => {
    let data = localStorage.getItem(storageName);
    data = data == null || undefined? [] : JSON.parse(data);

    if(img){
      img.forEach(element => {
        data.push({ pic: element, settings });
      });
      localStorage.setItem(storageName, JSON.stringify(data));
    }
    setRangeSliderVal(data);
  }, []);

  useEffect(() => {
    
  }, [rangeSliderVal, setRangeSlider]);

  const getRangeSlider = (indx) => {
    let data = JSON.parse(localStorage.getItem(storageName));
    if(data){
      data = data[indx]? data[indx] : null;
      return data;
    }
    return null;
  };

  const getRangeSliderAll = () => {
    let data = JSON.parse(localStorage.getItem(storageName));
    return data == null? [] : data;
  };

  const deleteRangeSlider = (indx) => {
    let data = JSON.parse(localStorage.getItem(storageName));
    if(data){
      data.splice(indx, 1);
      localStorage.setItem(storageName, JSON.stringify(data));
      setRangeSliderVal(data);
    }
  };

  const clearRangeSlider = () => {
    setRangeSliderVal([]);
    localStorage.removeItem(storageName);
  };


  return { 
    rangeSliderChoosen, setRangeSliderChoosen, 
    rangeSliderVal, setRangeSliderVal, 
    setRangeSlider, 
    getRangeSlider, getRangeSliderAll, 
    deleteRangeSlider, clearRangeSlider 
  };
}
