import React from 'react';
import { Dropdown, Button } from 'semantic-ui-react';

const FilterList = (props) => {

  const options = [
  { key: '0', text: 'No Filter', value:''},
  { key: '1', text: '😃 happy', value: '😃 happy' },
  { key: '2', text: '🤩 impressed', value: '🤩 impressed' },
  { key: '3', text: '🤪 party', value: '🤪 party' },
  { key: '4', text: '😒 meh', value: '😒 meh' },
  { key: '5', text: '🤮 disgusted', value: '🤮 disgusted' },
  { key: '6', text: '🤬 angry', value: '🤬 angry' },
  { key: '7', text: '🤯 mindblown', value: '🤯 mindblown' },
  { key: '8', text: '🤯 excited', value: '🤯 excited' }
];
  
  let handleChange = (e, {value}) => {
    props.onFilterChange(value);
  }

  return (
      <Dropdown button floating placeholder='Filter Topics' selection search options={options} onChange={handleChange}/>
  );
}

export default FilterList;
