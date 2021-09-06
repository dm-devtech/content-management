import React, { useState, useEffect } from 'react';
import Footer from './Footer.js'
import getAllUsers from '../Helpers/getAllUsers'
import deleteUser from '../Helpers/deleteUser'

const AllUsers = () => {
  const [list, setList] = useState("")

  useEffect(() => {
    async function setUserList() {
      const content = await getAllUsers()
      setList(content)
    }

    setUserList()
  }, []);

  async function removeUser(id) {
    await deleteUser(id) 
    const updatedUsers = await getAllUsers()
    setList(updatedUsers)
  }

    return (
      <div className='h1'>
        User View
        <br/>
          <div className='lead' data-testid="user" >
        {list === undefined || list.length === 0 || list === 0 ? "No Users" :
        <ul>
        {list.map(user => (
          <li key={user.user_id} >
            User email: {user.email}
            <br/>
             User Role: {user.role}
             <br/>
              Date Created: {user.date_created.toString().slice(0,10)}
              <br />
              <button data-testid="delete-button" className="btn btn-outline-dark" onClick={() => removeUser(user.user_id)}>
              Delete User </button>
            </li>
          ))}
        </ul>}
      </div>
      <Footer/>
      </div>
    );
  }

export default AllUsers;
