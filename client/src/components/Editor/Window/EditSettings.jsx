import React, { useEffect } from 'react';
import { useBetween } from "use-between";
import { RangeSlider } from './Settings';
import RangeSliderList from './Settings/RangeSliderList.json';
import { Ajax } from './../../../hooks/Ajax';
import { EditedImgStorage } from './../../../hooks/EditedImgStorage';


function EditSettings(props) {
  const { loading, request, error, clearError } = Ajax();
  const { updateEdited, getEdited } = useBetween(EditedImgStorage);

  let icoChoosen = props.icoChoosen;

  const editFile = async (form) => {
    form.preventDefault();
    try {
      let formData = new FormData(form.target);
      let settings = Object.fromEntries(formData);
      //let edited = getEdited(props.indx);

      let flag = 0;
      for (let key in settings) {
        if (settings.hasOwnProperty(key)) {
          flag += Number(settings[key]);

          /*
          let sEdited = edited.settings;
          if(!!sEdited && !!sEdited[key]){
            if(
              settings[key] >= sEdited[key]
            ) {

            }
            for (let skey in sEdited) {
              if(
                sEdited.hasOwnProperty(skey) && 
                settings[key] >= sEdited[skey]
              ) {

              }
            }
          }
          */
        }
      }

      //props.pic = !!temp.filters? temp.pic : props.pic;
      if(!!!flag) {
        updateEdited(props.pic.pic, props.indx, settings);
        throw new Error('Need to change settings');
      }

      if(formData){  
        formData.append('file', JSON.stringify({
          data: props.pic.pic.img,
          name: props.pic.pic.name,
        }));

        const data = await request('/api/editor/edit', 'PUT', 'multipart/form-data', formData);
        if(data) {
          updateEdited(data, props.indx, settings);
        }
      }
      else{
        throw new Error('Troubles with photo editing');
      }
    } 
    catch (e) {
      console.log(e.message)
    }

    return false;
  }

  if(icoChoosen)
    return (
      <div className = 'edit-settings'>
        <form onSubmit={ editFile }>
          <span>Basic</span>
          { RangeSliderList.Basic.map((setting, index) => {
            return(
              <RangeSlider 
                key={ `Basic_${setting.name}_${index}` }
                value={ Object.keys(props.settings).length === 0? setting.start : props.settings[setting.name] } 
                param={ setting } 
              />
            );
          }) }
          <span>RGB</span>
          { RangeSliderList.RGB.map((setting, index) => {
            return(
              <RangeSlider
                key={ `RGB_${setting.name}_${index}` }
                value={ Object.keys(props.settings).length === 0? setting.start : props.settings[setting.name] } 
                param={ setting } 
              />
            );
          }) }
          <input type='submit' value='Upload' />
        </form>
      </div>
    );
        
  return (
    <div className = 'edit-settings' />
  );
}

export default EditSettings;
