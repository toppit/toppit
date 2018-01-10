import React from 'react'

export class Topic extends React.Component {
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
      <div>
          <div onClick={ () => this.renderTopicDetailedView()}>{this.props.topic.title}</div>
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



