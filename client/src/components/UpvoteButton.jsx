import React from 'react'
import { Card, Button, Icon } from 'semantic-ui-react';

class UpvoteButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      upvoteState: 'grey',
      numberOfUpvotes: this.props.topic.upvotes,
      currentUser: this.props.currentUser,
      topic: this.props.topic
    };
  }

  componentDidMount () {
    this.setState({
      currentUser: this.props.currentUser
    })
    this.checkifUserHasUpvoted();
  }
  
  checkifUserHasUpvoted () {
    var newUpvoteState = 'grey'
    if (this.props.currentUser && this.props.topic.upvoteUsers.includes(this.props.currentUser._id)) {
      newUpvoteState = 'blue';
    }
    this.setState({
      upvoteState: newUpvoteState,
      numberOfUpvotes: this.props.topic.upvotes
    }) 

  }


  handleClick() {
    var newUpvoteState = 'blue';
    var localIncrement = 1;
    if (this.props.currentUser && this.props.topic.upvoteUsers.includes(this.props.currentUser._id)) {
      localIncrement = -1;
      newUpvoteState = 'grey';
    }

    var IncrementUpvote = this.state.numberOfUpvotes + localIncrement;

    this.setState ({
      upvoteState: newUpvoteState,
      numberOfUpvotes: IncrementUpvote
    });
    this.props.upvote(this.props.topic._id, this.props.currentUser._id, localIncrement)
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