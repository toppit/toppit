import React from 'react';
import {Form} from 'semantic-ui-react';


const options = [
  { key: 'h', text: '🤩 happy', value: '🤩 happy' },
  { key: 'v', text: '🤮 vomit', value: '🤮 vomit' },
  { key: 'a', text: '🤬 angry', value: '🤬 angry' },
  { key: 'm', text: '🤯 mindblown', value: '🤯 mindblown' }
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
      <Form onSubmit={this.onSubmit}>
        <Form.Input label='Topic Headline' name='headline' onChange={this.onChange} value={this.state.headline} placeholder='Enter the headline of your topic' />
        <Form.TextArea label='Short Descriptin' name='description' onChange={this.onChange} value={this.state.description} placeholder='Tell us a little more about your idea' /> 
        <Form.Group inline>
          <Form.Select label="I'm feeling ..." name='emotion' onChange={this.onEmotion} options={options} placeholder='Emotion' />
          <Form.Button>Submit</Form.Button>
        </Form.Group>
      </Form>
    );
  }
}
export default NewTopic;
