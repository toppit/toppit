import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const SortList = (props) => {

  let options = [
    {value: 'timeStamp', text: 'Most Recent'},
    {value: 'upvotes', text: 'Most Popular'}
                ];
  
  let changeHandler = (e, {value}) => {
    props.onFilterSort(value);
  }

  return (
    <Dropdown placeholder='Sort by' selection search options={options} onChange={changeHandler}/>
  );
}

export default SortList;
