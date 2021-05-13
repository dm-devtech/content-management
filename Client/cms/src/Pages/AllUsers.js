import React, { Component } from 'react';
import Footer from '../components/Footer.js'

class AllUsers extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      list: []
    }
  }

  async getUserData() {
    try {
      const url = '/users/'
      const response = await fetch(url)
      const data = await response.json()
      return data
    } catch (err) {
      console.error(err.message);
    }
  }

  async deleteUser(id) {
    try {
      const url = '/users/'
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
    const content = await this.getUserData()
    this.setState({list: content})
  }

  render() {
    const {list} = this.state;
    return (
      <div className='Header'>
        User View
        <br/>
          <div className='body-text'>
        {list === undefined || list.length === 0 ? "No Users" :
        <ul>
        {list.map(user => (
          <li key={user.user_id}>
            User email: {user.title}
            <br/>
             User Role: {user.content}
             <br/>
              Date Created: {user.date_created.toString().slice(0,10)}
              <button className="add-button" onClick={()=> this.deleteUser(user.user_id)}>
              Delete User </button>
            </li>
          ))}
        </ul>}
      </div>
      <Footer/>
      </div>
    );
  }
}

export default AllUsers;
