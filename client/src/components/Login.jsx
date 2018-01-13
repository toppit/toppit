import React from 'react';
import { Segment, Button, Divider, Form, Header, Container, Card, Grid } from 'semantic-ui-react';
import http from 'axios';


class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }

  onSignIn() {
    http.post('/login', {
      username: this.state.username,
      password: this.state.password
    })

      .then((err) => {
        console.log(err.messagae);
      });
  }

  onSignUp() {
    http.post('/register', {
      username: this.state.username,
      password: this.state.password
    })

      .then((err) => {
        console.log(err.messagae);
      });
  }

  onChange(e, { value }) {
    const name = e.target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <Container>
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column width={7}>
              <Card>
                <Form onSubmit={this.onSignIn}>
                  <Header as='h1'>Sign In</Header>
                  <Form.Input label='username' name='username' value={this.state.username} onChange={this.onChange} autoComplete='username' placeholder='username' />
                  <Form.Input type='password' label='password' name='password' value={this.state.password} onChange={this.onChange} autoComplete='current-password' placeholder='password' />
                  <Form.Button type='submit'>Sign In</Form.Button>
                </Form>
              </Card>
            </Grid.Column>
            <Grid.Column width={2}>
              <Divider vertical>Or</Divider>
            </Grid.Column>
            <Grid.Column width={7}>
              <Card>
                <Form onSubmit={this.onSignUp}>
                  <Header as='h1'>Sign Up</Header>
                  <Form.Input label='username' name='username' value={this.state.username} onChange={this.onChange} autoComplete='username' placeholder='username' />
                  <Form.Input type='password' label='password' name='password' value={this.state.password} onChange={this.onChange} autoComplete='new-password' placeholder='password' />
                  <Form.Input type='password' label='confirm password' name='confirmpassword' value={this.state.Confirmpassword} onChange={this.onChange} autoComplete='new-password' placeholder='password' />
                  <Form.Button type='submit'>Sign Up</Form.Button>
                </Form>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Login;