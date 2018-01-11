import React from 'react';
import SortList from './SortList.jsx';
import FilterList from './FilterList.jsx';
import { Menu } from 'semantic-ui-react';

const UtilsBar = (props) => {
  return (
    <Menu secondary>
      <Menu.Item>
        <SortList onFilterSort={props.onFilterSort}/>
      </Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item>
          <FilterList onFilterSort={props.onFilterSort}/>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}

export default UtilsBar;