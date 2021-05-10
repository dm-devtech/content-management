import React, { Component } from 'react';

class List extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      list: []
    }
  }

  async deleteContent(id) {
    const url = '/content/'
    const response = await fetch(url+id,{
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
    this.setState({list: data})
  }

  render() {
    const {list} = this.state;
    return (
      <div>
        Content View
        <ul>
          {list.map(item => (
            <li key={item.content_id}>
              Title: {item.title} | Content: {item.content}
              <button className="button" onClick={()=> this.deleteContent(item.content_id)}>
              Delete Content </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default List;
