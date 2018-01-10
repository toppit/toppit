import React from 'react';
import { Input, Menu } from 'semantic-ui-react';

export default class NavBar extends React.Component {
  constructor() {
    super();

    this.state = { activeItem: 'home' };

    this.handleItemClick = (e, { name }) => {
      this.setState({ activeItem: name });
    }; 

  }


  render() {
    const { activeItem } = this.state;

    return (
      <Menu secondary>
        <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
        <Menu.Item name='newtopic' active={activeItem === 'newtopic'} onClick={this.handleItemClick} />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick} />
        </Menu.Menu>
      </Menu>
    );
  }
}

