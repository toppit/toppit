import React from 'react';
import { Dropdown, Button } from 'semantic-ui-react';

const FilterList = (props) => {

  const options = [
    { key: 'i', text: 'No Filter', value:''},
    { key: 'h', text: '🤩 happy', value: '🤩 happy' },
    { key: 'v', text: '🤮 vomit', value: '🤮 vomit' },
    { key: 'a', text: '🤬 angry', value: '🤬 angry' },
    { key: 'm', text: '🤯 mindblown', value: '🤯 mindblown' }
  ];
  
  let handleChange = (e, {value}) => {
    props.onFilterChange(value);
  }

  return (
      <Dropdown button floating placeholder='Filter Topics' selection search options={options} onChange={handleChange}/>
  );
}

export default FilterList;
