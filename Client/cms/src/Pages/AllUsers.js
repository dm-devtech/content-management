import React, { Component } from 'react';

class AllUsers extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      list: []
    }
  }

  async deleteUser(id) {
    const url = '/users/'
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
    const url = '/users/'
    const response = await fetch(url)
    const data = await response.json()
    this.setState({list: data})
  }

  render() {
    const {list} = this.state;
    return (
      <div>
        Content View
        <br/>
        {list.length === 0 ? "No Content" : ""}
        <ul>
          {list.map(user => (
            <li key={user.user_id}>
              User email: {user.title} | User Role: {user.content}
              <button className="button" onClick={()=> this.deleteUser(user.user_id)}>
              Delete User </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default AllUsers;
