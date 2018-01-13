import React from 'react'
import { Card, Button, Icon } from 'semantic-ui-react';

class UpvoteButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      upvoteState: 'grey',
      numberOfUpvotes: this.props.topic.upvotes
    };
  }

  handleClick() {
    var newUpvoteState = 'grey';
    if (this.state.upvoteState === 'grey') {
      newUpvoteState = 'blue';
    }
    var IncrementUpvote = this.state.numberOfUpvotes + 1;
    this.setState ({
      upvoteState: newUpvoteState,
      numberOfUpvotes: IncrementUpvote
    });
    this.props.upvote(this.props.topic._id)

    // this.props.upVote(this.props.topic._id);    
  }

  render() {
    return (
      <Button
        color={this.state.upvoteState} 
        content="UpVote"
        icon='heart'
        label={{ as: 'a', basic: true, content: this.state.numberOfUpvotes || 0}}
        labelPosition='right'
        onClick={ this.handleClick.bind(this)}
      />   
      )
  }
}
export default UpvoteButton;