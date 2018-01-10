import React from 'react';

const SortList = () => {
  
  let changeHandler = (e) => {
    console.log(e.value.target);
  }

  return (
    <select onChange={changeHandler}>
      <option value="timeStamp">Most Recent</option>
      <option value="upvotes">Most Popular</option>
    </select>
  );
}

export default SortList;