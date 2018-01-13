import React from 'react';
import { Segment, Button, Divider, Message, Menu, Form, Progress, Header, Container, Card, Grid } from 'semantic-ui-react';
import owasp from 'owasp-password-strength-test';

const colors = {
  '1': ['red', 'weak'],
  '2': ['red', 'weak'],
  '3': ['orange', 'weak'],
  '4': ['orange', 'ok'],
  '5': ['green', 'ok'],
  '6': ['green', 'good'],
  '7': ['green', 'strong']
};

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      pwStrength: 0,
      pwStrengthColor: 'grey',
      pwStrengthPhrase: 'password strength'
    };

    this.onChange = this.onChange.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.onEnterPassword = this.onEnterPassword.bind(this);
  }

  onSignUp() {
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        confirmPasswordError: true,
        passwordError: true,
        nonMatchingPasswords: true
      });
      return;
    }
    this.props.onSignUp(this.state.username, this.state.password);
  }

  onChange(e, { value }) {
    const name = e.target.name;

    this.setState({
      confirmPasswordError: false,
      passwordError: false,
      usernameError: false,
      [name]: value
    });

  }

  onEnterPassword(e, { value }) {
    var strength = owasp.test(value)
    let color = colors[strength.passedTests.length][0];
    let phrase = colors[strength.passedTests.length][1];

    
    this.setState({
      confirmPasswordError: false,
      passwordError: false,
      usernameError: false,
      password: value,
      pwStrength: strength.passedTests.length / 6 * 100,
      pwStrengthColor: color,
      pwStrengthPhrase: phrase
    });

  }

  render() {
    return (
      <Card raised centered>
        <Segment padded size='large'>
          <Form error={this.props.error ? true : false} onSubmit={this.onSignUp}>
            <Header as='h1'>Sign Up</Header>
            <Form.Input 
              label='username' 
              name='username' 
              value={this.state.username} 
              onChange={this.onChange} 
              autoComplete='username' 
              placeholder='username'
              error={this.state.usernameError} />
            <Form.Input 
              type='password' 
              label='password' 
              name='password' 
              value={this.state.password} 
              onChange={this.onEnterPassword} 
              autoComplete='new-password' 
              placeholder='password'
              error={this.state.passwordError} />
            <Progress percent={this.state.pwStrength} color={this.state.pwStrengthColor} size='tiny'>
              {this.state.pwStrengthPhrase}
            </Progress>
            <Form.Input 
              type='password' 
              label='confirm password' 
              name='confirmPassword' 
              value={this.state.ConfirmPassword} 
              onChange={this.onChange} 
              autoComplete='new-password' 
              placeholder='password'
              error={this.state.confirmPasswordError} />
            <Message
              error
              content={this.props.error}
            />
            <Form.Button primary type='submit'>Sign Up</Form.Button>
          </Form>
        </Segment>
      </Card>
    );
  }
}

export default SignUp;

