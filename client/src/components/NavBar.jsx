import React from 'react';
import { Input, Menu, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { activeItem: 'home' };

    this.handleItemClick = (e, { name }) => {
      this.setState({ activeItem: name });
    };

    this.onHome = this.onHome.bind(this);
    this.onNewTopic = this.onNewTopic.bind(this);
  }

  onHome() {
    this.props.history.push('/');
    this.props.home();
  }

  onNewTopic() {
    this.props.history.push('/share');
    this.props.createNewTopic();
  }


  render() {
    const { activeItem } = this.state;

    return (
      <Menu className='nav'>
        <Menu.Item name='home' active={activeItem === 'home'} onClick={this.onHome} />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Button primary onClick={this.onNewTopic}>Create Topic</Button>
          </Menu.Item>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          <Menu.Item href='/logout' name='logout' active={activeItem === 'logout'} />
        </Menu.Menu>
      </Menu>
    );
  }
}

