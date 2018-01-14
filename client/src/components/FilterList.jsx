import React from 'react';
import { Dropdown, Button } from 'semantic-ui-react';
import emojis from '../emojis';

var options = [{ key: '0', text: 'No Filter', value: ''}];
options = options.concat(emojis);
console.log(options);

const FilterList = (props) => {
  
  let handleChange = (e, {value}) => {
    props.onFilterChange(value);
  }

  return (
      <Dropdown button floating placeholder='Filter Topics' selection search options={options} onChange={handleChange}/>
  );
}

export default FilterList;
