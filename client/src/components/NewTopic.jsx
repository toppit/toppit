import React from 'react';
import {Form} from 'semantic-ui-react';


const options = [
  { key: 'h', text: '🤩', value: 'happy' },
  { key: 'v', text: '🤮', value: 'vomit' },
  { key: 'a', text: '🤬', value: 'angry' },
  { key: 'm', text: '🤯', value: 'mindblown' }
];

class NewTopic extends React.Component {
  constructor(props) {
    super(props);
  }


  // postNewTopic() {
  //   let topic = {
  //     headline: this.state.title,
  //     description: this.state.description
  //   };

  //   this.props.onNewTopic(topic);
  // }
  onSubmit(e, { value }) {
    console.log(e.target);
  }
    

  render() {

    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Input label='Topic Headline' placeholder='Enter the headline of your topic' />
        <Form.TextArea label='Short Descriptin' placeholder='Tell us a little more about your idea' /> 
        <Form.Group inline>
          <Form.Select label="I'm feeling ..." options={options} placeholder='Emotion' />
          <Form.Button>Submit</Form.Button>
        </Form.Group>
      </Form>
    );
  }
}
export default NewTopic;

/* 
        <Form.Select label='Description" options={[1,2,3]} placeholder='Emotion' />
*/


/*        <Form.Input label='Topic Headline' placeholder='Enter the headline of your topic' />
        <Form.textArea label='Short Descriptin' placeholder='Tell us a little more about your idea' /> 
        <Form.Button>Submit</Form.Button> */