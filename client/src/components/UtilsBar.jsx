import React from 'react';
import SortList from './SortList.jsx';
import FilterList from './FilterList.jsx';
import { Menu } from 'semantic-ui-react';

class UtilsBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      filterBy: props.defaultFilter,
      sortBy: props.defaultSort
    });
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
        <Menu.Item position='right'>
          <SortList  
            defaultSort={this.props.defaultSort} 
            onSortChange={this.onSortChange.bind(this)}/>
        </Menu.Item>
        <Menu.Menu>
          <Menu.Item>
            <FilterList 
              defaultFilter={this.props.defaultFilter}
              onFilterChange={this.onFilterChange.bind(this)}/>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default UtilsBar;