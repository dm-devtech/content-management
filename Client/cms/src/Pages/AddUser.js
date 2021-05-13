import React, { Component } from 'react';
import Footer from '../components/Footer.js'

class AddUser extends Component {
  // Initialize the state
  constructor(){
    super();
    this.state = {
      list: [],
      counter: 1,
      email: null,
      password: null,
      role: null,
      id: null
    }
  }

  // get users from api
  async retrieveUsers() {
    try {
      const newResponse = await fetch('/users/')
      const users = await newResponse.json()
      return users
    } catch (err) {
      console.error(err.message);
    }
  }

  // identify user_ids of data and store / return those ids
  async userIds() {
    const allUsers = await this.retrieveUsers()
    let ids = []
    const allUsersLength = allUsers === undefined || allUsers === 0 ? 0 : allUsers.length
      for(let i = 0; i < allUsersLength; i++){
        ids.push(allUsers[i].user_id)
      }
    const sortedIds = ids.sort((a,b)=> a-b)
    this.setState({id: sortedIds})
    return sortedIds
  }

    // counter used for moving between next and previous users
  async counter(direction) {
    const ids = await this.userIds()
    const allUsers = await this.retrieveUsers()
    const usersLength = allUsers === undefined || allUsers === 0 ? 0 : allUsers.length
    if(direction === "next" && this.state.counter <= (this.state.id.length-2)) await this.setState({counter: this.state.counter+1})
    if(direction === "previous" && this.state.counter > 0) await this.setState({counter: this.state.counter-1})
  }

    // switch to next or previous user
  async switchUser(direction) {
    const userIds = await this.userIds()
    const counter = await this.counter(direction)
    const newResponse = await fetch('/users/'+[userIds[this.state.counter]])
    const newData = await newResponse.json()
    this.setState({list: newData})
  }

  // delete one User
  async deleteUser() {
    const deleteResponse = await fetch('/users/'+this.state.currentUser,{
      method:'DELETE',
      header:{'Accept':'application/json', 'Content-Type':'application/json'}
    })
    await this.updateUserState()
  }

  // post new user from form to database
  async addNewUser() {
    const addUser = await fetch('/users/add',{
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({email: this.state.email, password: this.state.password, role: this.state.role, date_created: 'NOW()'})
    })
    this.updateUserState()
  }

  // refetch users from api when new user posted or user deleted
  async updateUserState() {
    const userIds = await this.userIds()
    const newResponse = await fetch('/users/'+[userIds[this.state.counter]])
    const newData = await newResponse.json()
    this.setState({list: newData})
  }

  // Handler when submitting new user on form
  mySubmitHandler = (event) => {
    event.preventDefault();
    alert("You have added new user:" + this.state.email);
    this.addNewUser()
  }

  // set form values as states
  myChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({[name]: value});
  }

  // Fetch the user list on first mount
  async componentDidMount() {
    const users = await this.retrieveUsers()
    const ids = await this.userIds()
    this.setState({list: users[0]})
    this.setState({currentUser: ids[0]})
}

  render() {
    const {list} = this.state;
    return (
      <div className='Header'> User View
        <div className='body-text'>
          User Email: {list === undefined || list.length === 0 ? "-" : list.email}
          <br/>
          User Role: {list === undefined || list.length === 0 ? "-" : list.role}
          <br/>
          Date Created: {list === undefined || list.length === 0 ? "-" : list.date_created}
          <br/>
          <button className="add-button" onClick={()=> this.switchUser("previous")}>
            Previous User </button>
          <button className="add-button" onClick={()=> this.switchUser("next")}>
            Next User </button>
          <button className="add-button" onClick={()=> this.deleteUser()}>
            Delete User </button>
            <div className='body-text'>
              Add User
              <form onSubmit={this.mySubmitHandler}>
                <p>Enter User Email:</p>
                  <textarea
                    name='email'
                    onChange={this.myChangeHandler}
                    style={{width: "200px"}}
                  />
                <p>Enter User Password:</p>
                  <input
                    name='password'
                    type='password'
                    onChange={this.myChangeHandler}
                    style={{width: "200px"}}
                  />
                <p>Enter User Role:</p>
                  <textarea
                    name='role'
                    onChange={this.myChangeHandler}
                    style={{width: "200px"}}
                  />
                <br/>
                  <input
                    type='submit'
                    data-testid='Submit'
                    className='add-button'
                  />
              </form>
            </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default AddUser;
