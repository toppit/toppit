import React from 'react';
class NewTopic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        title: '',
        description: ''
    }
  }

  onTitleChange(e) {
    // console.log('on change', $('.newTopicInput').val())
    this.setState({
        title: e.target.value
    });

    console.log(e.target.value, 'title')
  }

  onDescriptionChange(e) {
    // console.log('on change', $('.newTopicInput').val())
    this.setState({
        text: e.target.value
    });

    console.log(e.target.value, 'description')
  }

  postNewTopic() {
    let topic = {
        title: this.state.title,
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
                    <textarea className="newTextareaInput" value={this.state.text} onChange={this.onDescriptionChange.bind(this)} />
                </div>
                <input type="submit" value="Submit" onClick={this.postNewTopic.bind(this)}/>
            </div>
        )
    }
}
export default NewTopic;