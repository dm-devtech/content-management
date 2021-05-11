import React, { Component } from 'react';

class AddUser extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      list: [],
      counter: 1,
      email: null,
      password: null,
      role: null,
      id: null
    }
  }

  async userIds() {
    const newResponse = await fetch('/users/')
    const data = await newResponse.json()
    let ids = []
      for(let i = 0; i < data.length; i++){
        ids.push(data[i].user_id)
      }
    const sortedIds = ids.sort((a,b)=> a-b)
    this.setState({id: sortedIds})
    return sortedIds
  }

  // User counter
  async counter(direction) {
    const ids = await this.userIds()
    const fetchUsers = await fetch('/users/')
    const allUsers = await fetchUsers.json()
    const usersLength = allUsers.length
    if(direction === "next" && this.state.counter <= (this.state.id.length-2)) await this.setState({counter: this.state.counter+1})
    if(direction === "previous" && this.state.counter > 0) await this.setState({counter: this.state.counter-1})
  }

  // switch to next or previous user
  async switchUser(direction) {
    const userIds = await this.userIds()
    const url = '/users/'
    const counter = await this.counter(direction)
    const newResponse = await fetch(url+[userIds[this.state.counter]])
    const newData = await newResponse.json()
    this.setState({list: newData})
  }

  // delete one User
  async deleteUser(id) {
    const url = '/users/'
    const deleteResponse = await fetch(url+id,{
      method:'DELETE',
      header:{'Accept':'application/json', 'Content-Type':'application/json'}
    })
    this.updateUserState()
  }

  async addNewUser() {
    const url = '/users/add'
    const deleteResponse = await fetch(url,{
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({email: this.state.email, password: this.state.password, role: this.state.role})
    })
    this.updateUserState()
  }

  async updateUserState() {
    const userIds = await this.userIds()
    const newResponse = await fetch('/users/'+[userIds[this.state.counter]])
    const newData = await newResponse.json()
    this.setState({list: newData})
  }

  mySubmitHandler = (event) => {
    event.preventDefault();
    alert("You have added new user:" + this.state.email);
    this.addNewUser()
  }

  myChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({[name]: value});
  }

  // Fetch the list on first mount
  async componentDidMount() {
    const url = '/users/'
    const response = await fetch(url)
    const data = await response.json()
    const firstUser = data[0]
    this.setState({list: firstUser})
  }

  render() {
    return (
      <div> User View
        <div>
          User Email: {this.state.list === undefined ? "-" : this.state.list.email}
          <br/>
          User Role: {this.state.list === undefined ? "-" : this.state.list.email}
          <br/>
          <button className="button" onClick={()=> this.switchUser("previous")}>
          Previous User </button>
          <button className="button" onClick={()=> this.switchUser("next")}>
          Next User </button>
          <button className="button" onClick={()=> this.deleteUser(this.state.id[this.state.counter])}>
          Delete User </button>
            <div>
            Add User
              <form onSubmit={this.mySubmitHandler}>
              <p>Enter User Email:</p>
              <input
                type='text'
                name='email'
                onChange={this.myChangeHandler}
              />
              <p>Enter User Password:</p>
              <input
                type='text'
                name='password'
                onChange={this.myChangeHandler}
              />
              <p>Enter User Role:</p>
              <input
                type='text'
                name='role'
                onChange={this.myChangeHandler}
              />
              <input
                type='submit'
                data-testid='Submit'
              />
              </form>
            </div>
        </div>
      </div>
    );
  }
}

export default AddUser;
