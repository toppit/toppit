import React from 'react'

export class Topic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      upvotes: this.props.topic.upvotes
    }
  } 

  increaseUpvoteCount (topic) {
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



