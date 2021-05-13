import React, { Component } from 'react';
import Footer from '../components/Footer.js'

class AllContent extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      list: []
    }
  }

  async getContentData() {
    try {
      const url = '/content/'
      const response = await fetch(url)
      const data = await response.json()
      return data
    } catch (err) {
      console.error(err.message);
    }
  }

  async deleteContent(id) {
    try {
      const url = '/content/'
      const response = await fetch(url+id,{
        method:'DELETE',
        header:{'Accept':'application/json', 'Content-Type':'application/json'}
      })
      const newResponse = await fetch(url)
      const newData = await newResponse.json()
      this.setState({list: newData})
    } catch (err) {
      console.error(err.message);
    }
  }
  // Fetch the list on first mount
  async componentDidMount() {
    const content = await this.getContentData()
    this.setState({list: content})
  }

  render() {
    const {list} = this.state;
    return (
      <div className='Header'>
        Content View
        <br/>
        <div className='body-text'>
        {list === undefined || list.length === 0 ? "No Content" :
        <ul>
          {list.map(item => (
            <li key={item.content_id}>
              Title: {item.title}
              <br/>
              Content: {item.content}
              <br/>
              Data Created: {item.date_created.toString().slice(0, 10)}
              <br/>
              <button className="add-button" onClick={()=> this.deleteContent(item.content_id)}>
              Delete Content </button>
            </li>
          ))}
        </ul>}
      </div>
      <Footer/>
      </div>
    );
  }
}

export default AllContent;
