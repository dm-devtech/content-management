import React, { useState, useEffect } from 'react';
import Footer from './Footer.js'

const AllContent = () => {
  const [list, setList] = useState("")

  useEffect(() => {
    async function setContentList() {
      const content = await getContentData()
      setList(content)
    }

    setContentList()
  }, []);

  async function getContentData() {
    try {
      const url = '/content/'
      const response = await fetch(url)
      const data = await response.json()
      return data
    } catch (err) {
      console.error(err.message);
    }
  }

  async function deleteContent(id) {
    try {
      const url = '/content/'
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
      <div className='h1'>
        Content View
        <br/>
        <div className='lead' data-testid='content'>
        {list === undefined || list.length === 0 ? "No Content" :
        <ul >
          {list.map(content => (
            <li key={content.content_id}>
              Title: {content.title}
              <br/>
              Content: {content.content}
              <br/>
              Date Created: {content.date_created.toString().slice(0, 10)}
              <br/>
              <button className="btn btn-outline-dark" data-testid='delete-button' onClick={()=> deleteContent(content.content_id)}>
              Delete Content </button>
            </li>
          ))}
        </ul>}
      </div>
      <Footer/>
      </div>
    );
  }

export default AllContent;
