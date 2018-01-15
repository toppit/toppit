import React from 'react';
import { Form, Button, Icon, Input } from 'semantic-ui-react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      value: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    this.props.onSearch(null, this.state.value);
    this.setState({
      value: ''
    }) 
  }

  handleChange(e, {value}) {
    this.setState({
      isLoading: true,
      value: value
    });

    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 1500)
  }

  render() {
    return(
      <Form onSubmit={this.handleSubmit}>
        <Input  focus placeholder='Search...' value={this.state.value} onChange={this.handleChange} />
        <Button icon type='submit'color='blue' size='large' compact loading={this.state.isLoading}>
          <Icon name='search' />
        </Button>
      </Form>
    );
  }
}

export default Search;