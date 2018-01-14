import React from 'react';
import { Segment, Button, Divider, Icon, Message, Menu, Form, Header, Container, Card, Grid } from 'semantic-ui-react';


class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
  }

  onSignIn() {
    this.props.onSignIn(this.state.username, this.state.password);
  }

  onChange(e, { value }) {
    const name = e.target.name;
    
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <Card raised centered>
        <Segment padded size='huge'>
          <Form error={this.props.error ? true : false} onSubmit={this.onSignIn}>
            <Header as='h1'>Sign In</Header>
            <Button className='githublogin' fluid href='/auth/github' color='black'><Icon name='github'/>Sign in with Github</Button>
            <Button className='googlelogin' fluid href='/auth/google' color='google plus' ><Icon name='google'/>Sign in with Google</Button>
            <Form.Input label='username' name='username' value={this.state.username} onChange={this.onChange} autoComplete='username' placeholder='username' />
            <Form.Input type='password' label='password' name='password' value={this.state.password} onChange={this.onChange} autoComplete='current-password' placeholder='password' />
            <Message
              error
              content={this.props.error}
            />
            <Form.Button primary type='submit'>Sign In</Form.Button>
          </Form>
        </Segment>
      </Card>
    );
  }
}

export default SignIn;