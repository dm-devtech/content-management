import React, { Component } from 'react';

class AddContent extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      list: [],
      counter: 1,
      title: null,
      content: null,
      id: null
    }
  }

  async contentIds() {
    const newResponse = await fetch('/content/')
    const data = await newResponse.json()
    let ids = []
      for(let i = 0; i < data.length; i++){
        ids.push(data[i].content_id)
      }
    const sortedIds = ids.sort((a,b)=> a-b)
    this.setState({id: sortedIds})
    return sortedIds
  }

  // content counter
  async counter(direction) {
    const ids = await this.contentIds()
    const fetchContent = await fetch('/content/')
    const allContent = await fetchContent.json()
    // const contentLength = allContent.length
    if(direction === "next" && this.state.counter <= (this.state.id.length-2)) await this.setState({counter: this.state.counter+1})
    if(direction === "previous" && this.state.counter > 0) await this.setState({counter: this.state.counter-1})
  }

  // switch to next or previous piece of content
  async moveContent(direction) {
    const contentIds = await this.contentIds()
    const url = '/content/'
    const counter = await this.counter(direction)
    const newResponse = await fetch(url+[contentIds[this.state.counter]])
    const newData = await newResponse.json()
    this.setState({list: newData})
  }

  // delete one piece of content
  async deleteContent(id) {
    console.log("DC called")
    const url = '/content/'
    const deleteResponse = await fetch(url+id,{
      method:'DELETE',
      header:{'Accept':'application/json', 'Content-Type':'application/json'}
    })
    this.updateContentState()
  }

  async postNewContent() {
    const url = '/content/add'
    const deleteResponse = await fetch(url,{
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({title: this.state.title, content: this.state.content})
    })
    this.updateContentState()
  }

  async updateContentState() {
    const contentIds = await this.contentIds()
    const newResponse = await fetch('/content/'+[contentIds[this.state.counter]])
    const newData = await newResponse.json()
    this.setState({list: newData})
  }

  mySubmitHandler = (event) => {
    event.preventDefault();
    alert("You are submitting " + this.state.title);
    this.postNewContent()
  }

  myChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({[name]: value});
  }

  // Fetch the list on first mount
  async componentDidMount() {
    const url = '/content/'
    const response = await fetch(url)
    const data = await response.json()
    const firstContent = data[0]
    this.setState({list: firstContent})
  }

  render(props) {
    return (
      <div> Content View
        <div>
          Title: {this.state.list === undefined ? "-" : this.state.list.title}
          <br/>
          Content: {this.state.list === undefined ? "-" : this.state.list.content}
          <br/>
          <button className="button" onClick={()=> this.moveContent("previous")}>
          Previous Content </button>
          <button className="button" onClick={()=> this.moveContent("next")}>
          Next Content </button>
          <button className="button" onClick={()=> this.deleteContent(this.state.id[this.state.counter])}>
          Delete Content </button>
            <div>
            Add content
              <form onSubmit={this.mySubmitHandler}>
              <p>Enter Content Title:</p>
              <input
                type='text'
                name='title'
                onChange={this.myChangeHandler}
              />
              <p>Enter Content Body:</p>
              <input
                type='text'
                name='content'
                onChange={this.myChangeHandler}
              />
              <input
                type='submit'
                data-testid="Submit"
              />
              </form>
            </div>
        </div>
      </div>
    );
  }
}

export default AddContent;
