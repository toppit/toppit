import React from 'react';
import { Input, Menu, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { activeItem: 'home' };

    this.handleItemClick = (e, { name }) => {
      console.log(name);
      this.setState({ activeItem: name });
    };
  }

  

  render() {
    const { activeItem } = this.state;

    return (
      <Menu >
        <Menu.Item name='home' active={activeItem === 'home'} onClick={this.props.home} />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Link to='/share'>
              <Button primary onClick={this.props.createNewTopic}>Create Topic</Button>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick}  />
        </Menu.Menu>
      </Menu>
    );
  }
}

