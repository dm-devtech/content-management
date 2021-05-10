import React, { Component } from 'react';

class List extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      list: [],
      counter: 1
    }
  }

  // content counter
  async counter(direction) {
    const fetchContent = await fetch('/content/')
    const allContent = await fetchContent.json()
    const contentLength = allContent.length
    if(direction === "next" && this.state.counter <= contentLength-1 ) await this.setState({counter: this.state.counter+1})
    if(direction === "previous" && this.state.counter > 1) await this.setState({counter: this.state.counter-1})
  }

  // switch to next piece of content
  async moveContent(direction) {
    const url = '/content/'
    const counter = await this.counter(direction)
    const newResponse = await fetch(url+[this.state.counter])
    const newData = await newResponse.json()
    this.setState({list: newData})
  }

  // delete one piece of content
  async deleteContent(id) {
    const url = '/content/'
    const deleteResponse = await fetch(url+id,{
      method:'DELETE',
      header:{'Accept':'application/json', 'Content-Type':'application/json'}
    })
    const newResponse = await fetch(url)
    const newData = await newResponse.json()
    this.setState({list: newData})
  }

  // Fetch the list on first mount
  async componentDidMount() {
    const url = '/content/'
    const response = await fetch(url)
    const data = await response.json()
    const firstContent = data[0]
    this.setState({list: firstContent})
  }

  render() {
    return (
      <div> Content View
        <div>
          Title: {this.state.list.title}
          <br/>
          Content: {this.state.list.content}
          <br/>
          <button className="button" onClick={()=> this.moveContent("previous")}>
          Previous Content </button>
          <button className="button" onClick={()=> this.moveContent("next")}>
          Next Content </button>
          <button className="button" onClick={()=> this.deleteContent(this.state.counter)}>
          Delete Content </button>
        </div>
      </div>
    );
  }
}

export default List;
