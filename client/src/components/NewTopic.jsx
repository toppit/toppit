import React from 'react';
import {Form, Dimmer, Button, Segment, Container, Grid, Header, Icon} from 'semantic-ui-react';


const options = [
  { key: 'h', text: '😃 happy', class:'emoji', value: '😃 happy' },
  { key: 'h', text: '🤩 impressed', class: 'emoji', value: '🤩 impressed' },
  { key: 'h', text: '🤪 party', class: 'emoji', value: '🤪 party' },
  { key: 'h', text: '😒 meh', class: 'emoji', value: '😒 meh' },
  { key: 'v', text: '🤮 disgusted', class: 'emoji', value: '🤮 disgusted' },
  { key: 'a', text: '🤬 angry', class: 'emoji', value: '🤬 angry' },
  { key: 'm', text: '🤯 mindblown', class: 'emoji', value: '🤯 mindblown' },
  { key: 'm', text: '🤯 excited', class: 'emoji', value: '🤯 excited' }
];

class NewTopic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      headline: '',
      description: '',
      emotion: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onEmotion = this.onEmotion.bind(this);
  }

  onChange(e, { value }) {

    const name = e.target.name;

    this.setState({
      [name]: value
    });
  }

  onEmotion(e, {value}) {
    this.setState({
      emotion: value
    });
  }

  onSubmit(e, { value }) {

    console.log('Headline: ', this.state.headline);
    console.log('Description ', this.state.description);
    console.log('Emotion', this.state.emotion);

    if (this.state.headline.length > 0 && this.state.description.length > 0) {

      this.props.onNewTopic({
        headline: this.state.headline,
        description: this.state.description,
        emotion: this.state.emotion,
        timestamp: Date.now()
      });
    }
  }
    

  render() {
    console.log(this.state.headline);
    return (
      <Dimmer.Dimmable as={Form} blurring dimmed={this.props.active}>
        <Dimmer active={this.props.active} inverted page>
          <Container>
            <Grid columns={3}>
              <Grid.Row>
                <Grid.Column width={2}>
                </Grid.Column>
                <Grid.Column width={12}>
                  <Header as='h2' icon>
                    <Icon name='idea' />
                    Share a new idea
                    <Header.Subheader>
                      Share an idea, inspiration or frustration and gather reactions from others
                    </Header.Subheader>
                  </Header>
                </Grid.Column>
                <Grid.Column width={2}>
                  <Button circular icon='remove' onClick={this.props.closeNewTopic} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={2}>
                </Grid.Column>
                <Grid.Column width={12}>
                  <Form onSubmit={this.onSubmit}>
                    <Form.Input label='Topic Headline' name='headline' onChange={this.onChange} value={this.state.headline} placeholder='Enter the headline of your topic' />
                    <Form.TextArea label='Short Description' name='description' onChange={this.onChange} value={this.state.description} placeholder='Tell us a little more about your idea' />
                    <Form.Group inline>
                      <Form.Select label="I'm feeling ..." name='emotion' onChange={this.onEmotion} options={options} placeholder='Emotion' />
                      <Form.Button>Submit</Form.Button>
                    </Form.Group>
                  </Form>
                </Grid.Column>
                <Grid.Column width={2}>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Dimmer>
      </Dimmer.Dimmable>
    );
  }
}
export default NewTopic;
