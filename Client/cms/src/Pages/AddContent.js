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
  async deleteContent() {
    if(this.list === 0 || this.list === undefined) {
    }else {
      const url = '/content/'
      const deleteResponse = await fetch(url+this.state.currentContent,{
        method:'DELETE',
        header:{'Accept':'application/json', 'Content-Type':'application/json'}
      })
      this.updateContentState()
    }
  }

  async postNewContent() {
    const url = '/content/add'
    const postContent = await fetch(url,{
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({title: this.state.title, content: this.state.content, date_created: 'NOW()'})
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
    this.setState({currentContent: this.state.id[this.state.counter]})
  }

  render(props) {
    const {list} = this.state;
    return (
      <div className='Header'> Content View
        <div className='body-text'>
          Title: {list === undefined || list.length === 0 ? "-" : list.title}
          <br/>
          Content: {list === undefined || list.length === 0 ? "-" : list.content}
          <br/>
          Date Created: {list === undefined || list.length === 0  ? "-" : list.date_created.slice(0, 10)}
          <br/>
          <button className="add-button" onClick={()=> this.moveContent("previous")}>
          Previous Content </button>
          <button className="add-button" onClick={()=> this.moveContent("next")}>
          Next Content </button>
          <button className="add-button" onClick={()=> this.deleteContent()}>
          Delete Content </button>
            <div className='Header'>
            Add content
            <div className='alt-body'>
              <form onSubmit={this.mySubmitHandler}>
              <p>Enter Content Title:</p>
              <textarea
                name='title'
                onChange={this.myChangeHandler}
                style={{width: "250px"}}
              />
              <p>Enter Content Body:</p>
              <textarea
                name='content'
                onChange={this.myChangeHandler}
                style={{width: "250px", height: "80px"}}
              />
              <br/>
              <br/>
              <input
                type='submit'
                data-testid="Submit"
                className="add-button"
              />
              </form>
            </div>
            </div>
        </div>
      </div>
    );
  }
}

export default AddContent;
