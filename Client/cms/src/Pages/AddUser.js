import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer.js'

const AddUser = () => {
  const [list, setList] = useState([])
  const [counter, setCounter] = useState(1)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [role, setRole] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    async function setUserList() {
      const users = await retrieveUsers()
      const ids = await userIds()
      setList(users[0])
      setCurrentUser(ids[0])
    }

    setUserList()
  }, []);

  async function retrieveUsers() {
    try {
      const newResponse = await fetch('/users/')
      const users = await newResponse.json()
      return users
    } catch (err) {
      console.error(err.message);
    }
  }

  async function userIds() {
    const allUsers = await retrieveUsers()
    const sortedIds = allUsers.map(user => user.user_id).sort((a,b)=> a-b)
    return sortedIds
  }

  async function userCounter(direction) {
    const ids = await userIds()
    if(direction === "next" && counter <= (ids.length-2)) await setCounter(counter + 1)
    if(direction === "previous" && counter > 0) await setCounter(counter - 1)
  }

  async function switchUser(direction) {
    const ids = await userIds()
    userCounter(direction)
    const newResponse = await fetch('/users/'+[ids[counter]])
    const newData = await newResponse.json()
    setList(newData)
  }

  async function deleteUser() {
    const deleteResponse = await fetch('/users/'+currentUser,{
      method:'DELETE',
      header:{'Accept':'application/json', 'Content-Type':'application/json'}
    })
    await updateUserState()
  }

  async function addNewUser() {
    const addUser = await fetch('/users/add',{
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({email: email, password: password, role: role, date_created: 'NOW()'})
    })
    updateUserState()
  }
 
  async function updateUserState() {
    const ids = await userIds()
    const newResponse = await fetch('/users/'+[ids[counter]])
    const newData = await newResponse.json()
    setList(newData)
  }

  const mySubmitHandler = (event) => {
    event.preventDefault();
    alert("You have added new user:" + email);
    addNewUser()
  }

  const myChangeHandler = (event) => {
    let header = event.target.name;
    let value = event.target.value;
    if(header === 'email') setEmail(value)
    if(header === 'password') setPassword(value)
    if(header === 'role') setRole(value)
  }

    return (
      <div className='Header'> User View
        <div className='body-text'>
          User Email: {list === undefined || list.length === 0 ? "-" : list.email}
          <br/>
          User Role: {list === undefined || list.length === 0 ? "-" : list.role}
          <br/>
          Date Created: {list === undefined || list.length === 0 ? "-" : list.date_created}
          <br/>
          <button className="add-button" onClick={() => switchUser("previous")}>
            Previous User </button>
          <button className="add-button" onClick={() => switchUser("next")}>
            Next User </button>
          <button className="add-button" onClick={() => deleteUser()}>
            Delete User </button>
            <div className='body-text'>
              Add User
              <form onSubmit={mySubmitHandler}>
                <p>Enter User Email:</p>
                  <textarea
                    name='email'
                    onChange={myChangeHandler}
                    style={{width: "200px"}}
                  />
                <p>Enter User Password:</p>
                  <input
                    name='password'
                    type='password'
                    onChange={myChangeHandler}
                    style={{width: "200px"}}
                  />
                <p>Enter User Role:</p>
                  <textarea
                    name='role'
                    onChange={myChangeHandler}
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


export default AddUser;
