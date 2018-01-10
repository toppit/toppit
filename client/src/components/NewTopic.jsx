import React from 'react';
import $ from "jquery";
class NewTopic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        title: '',
        text: ''
    }
  }

  onInputChange(e) {
    // console.log('on change', $('.newTopicInput').val())
    this.setState({title: $('.newTopicInput').val()})
    console.log($('.newTopicInput').val())
    console.log(this.state.title, 'title')
  }

    onTextareaChange(e) {
    // console.log('on change', $('.newTopicInput').val())
    this.setState({text: $('.newTextareaInput').val()})
    console.log($('.newTextareaInput').val())
  }

    postNewTopic(title, text) {
    let data = {
        title: this.state.title,
        text: this.state.text
    }
    componentDidMount(data)
    }

      componentDidMount(data) {
    $.ajax({
        type: "POST",
        url: "/topics",
        data: data,
        success: () => {
            console.log('success')
        },
        error: () => {
            console.log('failed')
        }
    })
  }

  render() {
        return (
            <div className="topic">
                <div className="titleDiv">
                    <h3>Title</h3>
                    <input className="newTopicInput" type="text" value={this.state.title} onChange={() => this.onInputChange()} />
                </div>
                <div className="textDiv">
                    <h3>Text</h3>
                    <textarea className="newTextareaInput" value={this.state.text} onChange={() => this.onTextareaChange()} />
                </div>
                <input type="submit" value="Submit" onClick={() => this.postNewTopic()}/>
            </div>
        )
    }
}
export default NewTopic;