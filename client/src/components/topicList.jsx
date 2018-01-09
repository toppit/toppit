import React from 'react'

export class TopicList extends React.Component {
  constructor(props) {
    super(props);
  }

  this.state = {
    topicList: [{
      title: 'Bathrooms need coffee machines',
      upvotes: 30,
      numberOfComments: 10
    }, {
      title: 'More tapouts',
      upvotes: 2,
      numberOfComments: 34
    }],

  }

  renderTopicDetailedView () {

  }

  render() {
    return (
      {this.state.topicList.map( (topic) => {
        return <Topic topic={topic} handleClick={this.renderTopicDetailedView.bind(this)}/>

      })}

      )
  }
}