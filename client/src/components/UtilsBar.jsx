import React from 'react';
import SortList from './SortList.jsx';
import { Menu } from 'semantic-ui-react';

const UtilsBar = () => {
  return (
    <Menu secondary>
      <Menu.Item >
        <SortList />
      </Menu.Item>
    </Menu>
  );
}

export default UtilsBar;