import React from 'react';

class NewTopic extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: ''
    };
  }

  onTitleChange(e) {
    this.setState({
      title: e.target.value
    });
  }

  onDescriptionChange(e) {
    this.setState({
        description: e.target.value
    });
  }

  postNewTopic() {
    let topic = {
        headline: this.state.title,
        description: this.state.description
    };

    this.props.onNewTopic(topic);
  }
    

  render() {
        return (
            <div className="topic">
                <div className="titleDiv">
                    <h3>Title</h3>
                    <input className="newTopicInput" type="text" value={this.state.title} onChange={this.onTitleChange.bind(this)} />
                </div>
                <div className="textDiv">
                    <h3>Text</h3>

                    <textarea className="newTextareaInput" value={this.state.description} onChange={this.onDescriptionChange.bind(this)} />
                </div>
                <input type="submit" value="Submit" onClick={this.postNewTopic.bind(this)}/>
            </div>
        )
    }
}
export default NewTopic;