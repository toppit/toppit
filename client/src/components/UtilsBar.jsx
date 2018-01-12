import React from 'react';
import SortList from './SortList.jsx';
import FilterList from './FilterList.jsx';
import { Menu } from 'semantic-ui-react';

class UtilsBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      filterBy: '',
      sortBy: ''
    })
  }
  
  onSortChange(sortBy) {
    this.state.sortBy = sortBy;
    this.props.onDropdownChange(this.state);
  }

  onFilterChange(filterBy) {
    this.state.filterBy = filterBy;
    this.props.onDropdownChange(this.state);
  }

  render() {
    return (
      <Menu secondary>
        <Menu.Item>
          <SortList onSortChange={this.onSortChange.bind(this)}/>
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <FilterList onFilterChange={this.onFilterChange.bind(this)}/>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default UtilsBar;