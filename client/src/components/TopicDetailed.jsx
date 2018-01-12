import React from 'react';
import {Container, Header, Card, Icon, Button} from 'semantic-ui-react';
import http from 'axios';

class TopicDetailed extends React.Component {
  constructor(props) {
    super(props);
    console.log('Topic Id: ', props.topicId);

    this.state = {
      topic: null
    };
  }

  componentDidMount() {
    http.get(`/api/topic/${this.props.topicId}`)

      .then(({data}) => {
        console.log('Topic: ', data);
        this.setState({
          topic: data
        });
      })

      .catch((err) => {
        console.log(err.message);
      });
  }
  
  render() {
    if (!this.state.topic) {
      return null;
    }

    const {topic} = this.state;

    return (
      <Container>
        <Card fluid>
          <Card.Content header={topic.headline} />
          <Card.Content description={topic.description} />
          <Card.Content extra>
            <Button
              content="UpVote"
              icon='heart'
              label={{ as: 'a', basic: true, content: topic.upvotes || 0 }}
              labelPosition='right'
            />
            <Icon name='comments' />
            {topic.comments || 0} comments
          </Card.Content>
        </Card>
      </Container>
    );
  }
}

export default TopicDetailed;