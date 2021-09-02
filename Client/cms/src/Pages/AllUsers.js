import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer.js'

const AllUsers = () => {
  const [list, setList] = useState("")

  useEffect(() => {
    async function setUserList() {
      const content = await getUserData()
      setList(content)
    }

    setUserList()
  }, []);

  async function getUserData() {
    try {
      const url = '/users/'
      const response = await fetch(url)
      const data = await response.json()
      return data
    } catch (err) {
      console.error(err.message);
    }
  }

  async function deleteUser(id) {
    try {
      const url = '/users/'
      const response = await fetch(url+id,{
        method:'DELETE',
        header:{'Accept':'application/json', 'Content-Type':'application/json'}
      })
      const newResponse = await fetch(url)
      const newData = await newResponse.json()
      setList(newData)
    } catch (err) {
      console.error(err.message);
    }
  }

    return (
      <div className='Header'>
        User View
        <br/>
          <div className='body-text'>
        {list === undefined || list.length === 0 ? "No Users" :
        <ul>
        {list.map(user => (
          <li key={user.user_id}>
            User email: {user.email}
            <br/>
             User Role: {user.role}
             <br/>
              Date Created: {user.date_created.toString().slice(0,10)}
              <button className="add-button" onClick={() => deleteUser(user.user_id)}>
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
