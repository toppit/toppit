import React from 'react';

class Topic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      upvotes: this.props.topic.upvotes,
      upvoteState: false
    }
  } 

  increaseUpvoteCount (topic) {
    //if neutral state
    var plusOrMinusCount = 0
    if (!this.state.upVoteState) {
      plusOrMinusCount = 1;
    } else {
      plusOrMinusCount = -1;
     }
    // http PUT request to server to increase/decrease upvote count
    //use axios
    this.setState({
      upvotes: topic.upvotes++
    })
  }

  renderTopicDetailedView () {
    //react router something?
    console.log('clicked Topic! Goes to topicView page');
  }  

  render() {
    return (
      <div className='topic-container'>
          <div onClick={ () => this.renderTopicDetailedView()}>{this.props.topic.headline}</div>
          <div>{this.props.topic.description}</div>
          <div>upvotes: {this.state.upvotes} </div>
          <div>comments: {this.props.topic.numberOfComments}</div>
          <button 
            type="button" 
            name="upvote"
            onClick={ () => this.increaseUpvoteCount(this.props.topic)}
            >Upvote
          </button>
      </div>
      )
  }  
}

export default Topic;



