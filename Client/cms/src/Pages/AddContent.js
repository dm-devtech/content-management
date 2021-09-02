import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer.js'

const AddContent = () => {
  const [list, setList] = useState([])
  const [counter, setCounter] = useState(1)
  const [title, setTitle] = useState(null)
  const [content, setContent] = useState(null)
  const [currentContent, setCurrentContent] = useState(null)

  useEffect(() => {
    async function setContentList() {
      const content = await retrieveContent()
      const ids = await contentIds()
      setList(content[0])
      setCurrentContent(ids[0])
    }

    setContentList()
  }, []);

  async function retrieveContent() {
    try {
      const newResponse = await fetch('/content/')
      const content = await newResponse.json()
      return content === undefined || content.length === 0 ? 0 : content
    } catch (err) {
      console.error(err.message);
    }
  }

  async function contentIds() {
    const allContent = await retrieveContent()
    const sortedIds = allContent.map(content => content.content_id).sort((a,b)=> a-b)
    return sortedIds
  }

  async function contentCounter(direction) {
    const ids = await contentIds()
    if(direction === "next" && counter <= (ids.length-2)) setCounter(counter + 1)
    if(direction === "previous" && counter > 0) setCounter(counter - 1)
  }

  async function moveContent(direction) {
    const ids = await contentIds()
    contentCounter(direction)
    const newResponse = await fetch('/content/'+[ids[counter]])
    const newData = await newResponse.json()
    setList(newData)
  }

  async function deleteContent() {
    const deleteResponse = await fetch('/content/'+currentContent,{
      method:'DELETE',
      header:{'Accept':'application/json', 'Content-Type':'application/json'}
    })
    await updateContentState()
  }

  async function postNewContent() {
    const postContent = await fetch('/content/add',{
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({title: title, content: content, date_created: 'NOW()'})
    })
    updateContentState()
  }

  async function updateContentState() {
    const ids = await contentIds()
    const newResponse = await fetch('/content/'+[ids[counter]])
    const newData = await newResponse.json()
    setList(newData)
  }

  const mySubmitHandler = (event) => {
    event.preventDefault();
    alert("You are submitting " + title);
    postNewContent()
  }

  const myChangeHandler = (event) => {
    let header = event.target.name;
    let body = event.target.value;
    if(header === 'title') setTitle(body)
    if(header === 'content') setContent(body)
  }

    return (
      <div className='Header'> Content View
        <div className='body-text'>
          Title: {list === undefined || list.length === 0 ? "-" : list.title}
          <br/>
          Content: {list === undefined || list.length === 0 ? "-" : list.content}
          <br/>
          Date Created: {list === undefined || list.length === 0 ? "-" : list.date_created}
          <br/>
          <button className="add-button" onClick={() => moveContent("previous")}>
            Previous Content </button>
          <button className="add-button" onClick={() => moveContent("next")}>
            Next Content </button>
          <button className="add-button" onClick={() => deleteContent()}>
            Delete Content </button>
            <div className='body-text'>
              Add content
              <form onSubmit={mySubmitHandler}>
                <p>Enter Content Title:</p>
                <textarea
                  name='title'
                  onChange={myChangeHandler}
                  style={{width: "250px"}}
                />
                <p>Enter Content Body:</p>
                <textarea
                  name='content'
                  onChange={myChangeHandler}
                  style={{width: "250px", height: "80px"}}
                />
                <br/>
                <br/>
                <input
                  type='submit'
                  data-testid="Submit"
                  className="add-button"
                />
              </form>
            </div>
        </div>
        <Footer/>
      </div>
    );
  }


export default AddContent;
