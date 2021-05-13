import React, { Component } from 'react';
import Footer from '../components/Footer.js'

class AddContent extends Component {
  // Initialize the state
  constructor(){
    super();
    this.state = {
      list: [],
      counter: 1,
      title: null,
      content: null,
      id: null
    }
  }

  // get content from api
  async retrieveContent() {
    try {
      const newResponse = await fetch('/content/')
      const content = await newResponse.json()
      return content === undefined || content.length === 0? 0 : content
    } catch (err) {
      console.error(err.message);
    }
  }

  // identify content_ids of data and store / return those ids
  async contentIds() {
    const allContent = await this.retrieveContent()
    let ids = []
    const allContentLength = allContent === undefined || allContent === 0 ? 0 : allContent.length
      for(let i = 0; i < allContentLength; i++){
        ids.push(allContent[i].content_id)
      }
    const sortedIds = ids.sort((a,b)=> a-b)
    this.setState({id: sortedIds})
    return sortedIds
  }

  // counter used for moving between next and previous content
  async counter(direction) {
    const ids = await this.contentIds()
    const allContent = await this.retrieveContent()
    if(direction === "next" && this.state.counter <= (this.state.id.length-2)) await this.setState({counter: this.state.counter+1})
    if(direction === "previous" && this.state.counter > 0) await this.setState({counter: this.state.counter-1})
  }

  // switch to next or previous piece of content
  async moveContent(direction) {
    const contentIds = await this.contentIds()
    const counter = await this.counter(direction)
    const newResponse = await fetch('/content/'+[contentIds[this.state.counter]])
    const newData = await newResponse.json()
    this.setState({list: newData})
  }

  // delete one piece of content
  async deleteContent() {
    const deleteResponse = await fetch('/content/'+this.state.currentContent,{
      method:'DELETE',
      header:{'Accept':'application/json', 'Content-Type':'application/json'}
    })
    await this.updateContentState()
  }

  // post new content from form to database
  async postNewContent() {
    const postContent = await fetch('/content/add',{
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({title: this.state.title, content: this.state.content, date_created: 'NOW()'})
    })
    this.updateContentState()
  }

  // refetch content from api when new content posted or content deleted
  async updateContentState() {
    const contentIds = await this.contentIds()
    const newResponse = await fetch('/content/'+[contentIds[this.state.counter]])
    const newData = await newResponse.json()
    this.setState({list: newData})
  }

  // Handler when submitting new content on form
  mySubmitHandler = (event) => {
    event.preventDefault();
    alert("You are submitting " + this.state.title);
    this.postNewContent()
  }

  // set form values as states
  myChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({[name]: value});
  }

  // Fetch the content list from api on first mount
  async componentDidMount() {
    const content = await this.retrieveContent()
    const ids = await this.contentIds()
    this.setState({list: content[0]})
    this.setState({currentContent: ids[0]})
  }

  render() {
    const {list} = this.state;
    return (
      <div className='Header'> Content View
        <div className='body-text'>
          Title: {list === undefined || list.length === 0 ? "-" : list.title}
          <br/>
          Content: {list === undefined || list.length === 0 ? "-" : list.content}
          <br/>
          Date Created: {list === undefined || list.length === 0 ? "-" : list.date_created}
          <br/>
          <button className="add-button" onClick={()=>  this.moveContent("previous")}>
            Previous Content </button>
          <button className="add-button" onClick={()=>  this.moveContent("next")}>
            Next Content </button>
          <button className="add-button" onClick={()=> this.deleteContent()}>
            Delete Content </button>
            <div className='body-text'>
              Add content
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
        <Footer/>
      </div>
    );
  }
}

export default AddContent;
