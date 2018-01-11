import React from 'react';
import GoogleSignIn from 'react-google-signin';
import { Segment, Button, Divider } from 'semantic-ui-react';


class Login extends React.Component {
  constructor() {
    super();
  }

  onSignIn(userProfile, accessToken) {
    console.log(userProfile);
    console.log(accessToken);
  }

  signOut() {
    this.googleAuth.signOut();
  }

  onFailure(err) {
    console.log(err);
  }

  render() {
    return (
      <Segment padded>
        <GoogleSignIn clientId='28722236365-jq47qgutedd4mfviu1fiitdmqfc1voug'
          ref={g => this.googleAuth = g}
          onSuccess={this.onSignIn.bind(this)}
        />
        <Button onClick={this.signOut.bind(this)}>Sign Out</Button>
        <a href="/auth/google"> Sign In with Google</a>
 
      </Segment>
    );
  }
}

export default Login;


/*        <Button primary fluid>Login</Button>
        <Divider horizontal>Or</Divider>
        <Button secondary fluid>Sign Up Now</Button>
        */