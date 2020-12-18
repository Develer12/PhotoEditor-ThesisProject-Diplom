import { pixelate } from 'jimp';
import React, { useState, useEffect, useCallback } from 'react';
import BurgerMenu from 'react-burger-menu';
import { useBetween } from "use-between";
import { Ajax } from './../../hooks/Ajax';
import { EditedImgStorage } from './../../hooks/EditedImgStorage';
import { IcoImgStorage } from './../../hooks/IcoImgStorage';
import { OrigImgStorage } from './../../hooks/OrigImgStorage';

import './Burg.scss';
import FilterList from './FilterList.json';
const Demo = (props) => {
  const Menu = BurgerMenu.slide;
  const { loading, request, error, clearError } = Ajax();
  const { updateEdited, getEdited, PresetList, setPresetList } = useBetween(EditedImgStorage);
  const { icoChoosen } = useBetween(IcoImgStorage);
  const picIndx = icoChoosen.indx;
  const { getOrig } = useBetween(OrigImgStorage);


  const getFilters = useCallback(async () => {
    try {
      const data = await request('/api/editor/preset/all', 'GET');
      if(!!data){
        setPresetList(data);
      }
    } 
    catch (e) {
      console.log(e);
    }
  });
  
  useEffect(() => { 
    getFilters();
  }, []);

  const usePreset = async (name, event) => {
    try {
      if(!!name) {
        const pic = getOrig(picIndx);

        let settings = await request(`/api/editor/preset/${name}`, 'GET');
        let body = new FormData();
        body.append('file', JSON.stringify({
          data: pic.pic.img,
          name: pic.pic.name
        }));
        body.append('settings', JSON.stringify(settings));
        let data = await request('/api/editor/edit', 'PUT', 'multipart/form-data', body);
        console.log(data)

        if(data) {
          settings = JSON.parse(settings);
          updateEdited(data, picIndx, settings);
        }
      }
    } 
    catch (e) {
      console.log(e.message)
    }
  }

  const delPreset = async (name, event) => {
    try {
      if(!!name) {
        const pic = getEdited(picIndx);

        let data = await request(`/api/editor/preset/${name}`, 'DELETE');

        if(!!data) {
          getFilters();
        }
      }
    } 
    catch (e) {
      console.log(e.message)
    }
  }
  

  return(
    <div id='outer-container'>
      <div className='slide'>
        <Menu
          onClick={ getFilters }
          customBurgerIcon={ <img src='/icons/triangle.svg' /> }
          pageWrapId = { 'page-wrap' }
          outerContainerId = { 'outer-container' }
          right = { false }
          isOpen={ false }
        >
          <div className='slide-item'>
            <span>Presets</span>
            {
              (!!picIndx || picIndx === 0? true : false) &&
              PresetList.map((elem, index) => {
                const presetName = elem.name;
                return (
                  <a key={ `preset_${ elem._id }` }>
                    <span>{ presetName }</span>
                    <div>
                      <span onClick={ usePreset.bind(this, presetName) }>Use</span>
                      <span onClick={ delPreset.bind(this, presetName) }>delete</span>
                    </div>
                  </a>
                )
              })
            }
            {
              (!!!PresetList.length || picIndx === 0? !!picIndx : !!!picIndx) &&
              <span className='slide-msg'>No Presets</span>
            }
          </div>
          {/*
          <div className='slide-item'>
            <span>Filters</span>
            {
              FilterList.map((object, index) => {
                return (
                  <a key="0">
                    <i className="fa fa-fw fa-star-o" />
                    <span>{ object }</span>
                    <span onClick={ removeFilter.bind(this, object) }>delete</span>
                    <img onClick={ useFilter.bind(this, object) } src={ `./filters/${ object }.jpg` } />
                  </a>
                )
              })
            }
            {
              !!!FilterList.length &&
              <span className='slide-msg'>No Presets</span>
            }
          </div>
          */}
        </Menu>
      </div>
    </div>
  );
}

export default Demo;
