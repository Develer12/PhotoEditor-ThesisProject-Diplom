import React, { useState, useEffect } from 'react';


function  RangeSlider(props) {
  const param = props.param;
  let start = param.start;
  let value = props.value;
  const step = param.step == undefined || param.step == null? '1' : param.step;
  const [ range, setRange ] = useState(value !== start? value : start);

  useEffect(() => {
    setRange(value || start );
  }, [props]);

  const changeValue = (e) => {
    setRange(e.target.value);
  } 

  return (
    <div>
      <div onDoubleClick={ () => { setRange(start) } } className='labels'>
        <label htmlFor = { `range${param.name }` }>
          { param.name }
        </label>
        <label htmlFor = { `range${param.name }` }>{ range }</label>
      </div>
      <input type='range' 
        name = { param.name }
        onChange = { changeValue.bind(this) }
        min = { param.min }
        max = { param.max }
        value = { range || start } 
        step = { step } 
        id = { `range${param.name }` } 
      />
    </div>
    
  );
}

export default RangeSlider;
