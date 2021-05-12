import React, { Component } from 'react';

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
      <div>
        Content View
        <br/>
        {list === undefined || list.length === 0 ? "No Content" :
        <ul>
          {list.map(item => (
            <li key={item.content_id}>
              Title: {item.title} | Content: {item.content} | Data Created: {item.date_created.toString().slice(0, 10)}
              <button className="button" onClick={()=> this.deleteContent(item.content_id)}>
              Delete Content </button>
            </li>
          ))}
        </ul>}
      </div>
    );
  }
}

export default AllContent;
