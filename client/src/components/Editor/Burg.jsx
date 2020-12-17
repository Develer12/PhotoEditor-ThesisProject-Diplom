import React, { useState, useEffect, useCallback } from 'react';
import BurgerMenu from 'react-burger-menu';
import { useBetween } from "use-between";
import { Ajax } from './../../hooks/Ajax';
import { EditedImgStorage } from './../../hooks/EditedImgStorage';
import { IcoImgStorage } from './../../hooks/IcoImgStorage';
import { OrigImgStorage } from './../../hooks/OrigImgStorage';

import './Burg.scss';
import FilterList from './FilterList.json';
const FiltersList = [];
const Demo = (props) => {
  const Menu = BurgerMenu.slide;
  const [PresetList, setPresetList] = useState([]);
  const { loading, request, error, clearError } = Ajax();
  const { updateEdited, getEdited } = useBetween(EditedImgStorage);
  const { icoChoosen } = useBetween(IcoImgStorage);
  const picIndx = icoChoosen.indx;
  const { getOrig } = useBetween(OrigImgStorage);

  const useFilter = async (filter, event) => {
    try {
      if(filter) {
        const pic = getEdited(picIndx);
        let filters = pic.filters;

        if(!!!filters){
          filters = [ filter ];
        }
        else {
          filters.forEach(object => {
            if(filter === object) {
              throw new Error('Filter repeating');
            }
          });
          filters = filters.push(filter);
        }

        let body = new FormData();
        body.append('file', JSON.stringify({ filter, pic: pic.pic }));
        let data = await request('/api/editor/filter', 'PUT', 'multipart/form-data', body);

        if(data) {
          updateEdited(data, picIndx, pic.settings, filters);
          console.log(filters)
        }
      }
    } 
    catch (e) {
      console.log(e.message)
    }
  }

  const removeFilter = async (filter, event) => {
    try {
      if(filter) {
        const pic = getEdited(picIndx);

        let filters = pic.filters;
        if(!!!filters) {
          throw new Error('No filters for removing');
        }
        filters.splice(filters.indexOf(filter), 1);

        let urlPostfix = 'filter';
        let body = new FormData();
        let formData = { filter, pic: pic.pic };
        if(filters.length === 0) {
          console.log(body)
          console.log([...body])
          console.log(filters)
          body.append('file', JSON.stringify(formData));
          body.append('file', JSON.stringify(formData));
          formData = {
            data: pic.pic.img,
            name: pic.pic.name,
          };
          console.log(...body)
          console.log(body)
          urlPostfix = 'edit';
        }
        body.append('file', JSON.stringify(formData));

        let data //= await request(`/api/editor/${urlPostfix}`, 'PUT', 'multipart/form-data', body);

        if(data) {
          //updateEdited(data, picIndx, pic.settings, filters);
        }
      }
    } 
    catch (e) {
      console.log(e.message)
    }
  }

  const getFilters = useCallback(async () => {
    try {
      const data = await request('/api/editor/filter', 'GET');
      console.log(data);
      setPresetList(data);
    } 
    catch (e) {
      console.log(e);
    }
  });

  
  useEffect(() => { 
    getFilters();
  }, []);
  

  const getItems = () => {
    return [
      <a key="0">
        <i className="fa fa-fw fa-star-o" />
        <span>Favorites</span>
      </a>,
      <a key="1" href="">
        <i className="fa fa-fw fa-bell-o" />
        <span>Alerts</span>
      </a>,
      <a key="2" href="">
        <i className="fa fa-fw fa-envelope-o" />
        <span>Messages</span>
      </a>,
      <a key="3" href="">
        <i className="fa fa-fw fa-comment-o" />
        <span>Comments</span>
      </a>,
      <a key="4" href="">
        <i className="fa fa-fw fa-bar-chart-o" />
        <span>Analytics</span>
      </a>
    ];
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
              PresetList.map((object, index) => {
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
              !!!FiltersList.length &&
              <span className='slide-msg'>No Presets</span>
            }
          </div>
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
        </Menu>
      </div>
    </div>
  );
}

export default Demo;
