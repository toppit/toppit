import React from 'react';
import { Input, Menu, Button } from 'semantic-ui-react';

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
      <Menu primary>
        <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Button primary>Create Topic</Button>
          </Menu.Item>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick} />
        </Menu.Menu>
      </Menu>
    );
  }
}

