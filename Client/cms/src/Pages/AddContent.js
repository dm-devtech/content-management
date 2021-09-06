import React, { useState, useEffect } from 'react';
import Footer from './Footer.js'
import getAllContent from '../Helpers/getAllContent'
import getContentById from '../Helpers/getContentById'
import deleteContent from '../Helpers/deleteContent'
import postContent from '../Helpers/postContent'

const AddContent = () => {
  const [list, setList] = useState([])
  const [counter, setCounter] = useState(0)
  const [title, setTitle] = useState(null)
  const [content, setContent] = useState(null)
  const [currentContent, setCurrentContent] = useState(null)

  useEffect(() => {
    async function setContentList() {
      const content = await getAllContent() === undefined ? [] : await getAllContent()
      const ids = await getContentIds()
      await setList(content[0])
      await setCurrentContent(ids[0])
    }

    setContentList()
  }, []);

  async function getContentIds() {
    const allContent = await getAllContent() === undefined ? [] : await getAllContent()
    const sortedIds = allContent.map(content => content.content_id).sort((a,b)=> a-b)
    return sortedIds
  }

  async function contentCounter(direction) {
    const ids = await getContentIds()
    if(direction === "next" && counter <= (ids.length-2)) setCounter(counter + 1)
    if(direction === "previous" && counter > 0) setCounter(counter - 1)
  }

  async function moveContent(direction) {
    const ids = await getContentIds()
    await contentCounter(direction)
    const currentContentId = ids[counter]
    const updatedContent = await getContentById(currentContentId)
    await setList(updatedContent)
  }

  async function removeContent() {
    const ids = await getContentIds()
    const currentContentId = ids[counter]
    await deleteContent(currentContentId)
    await updateContentState()
  }

  async function postNewContent() {
    await postContent(title, content)
    await updateContentState()
  }

  async function updateContentState() {
    const ids = await getContentIds()
    const currentContentId = ids[counter]
    const updatedContent = await getContentById(currentContentId)
    await setList(updatedContent)
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
      <div className="h1"> Content View
        <div className='lead' data-testid='info'>
          Title: {list === undefined || list.length === 0 ? "-" : list.title}
          <br/>
          Content: {list === undefined || list.length === 0 ? "-" : list.content}
          <br/>
          Date Created: {list === undefined || list.length === 0 ? "-" : list.date_created}
          <br/>
          <button className="btn btn-outline-dark" onClick={() => moveContent("previous")}>
            Previous Content </button>
          <button className="btn btn-outline-dark" onClick={() => moveContent("next")}>
            Next Content </button>
          <button className="btn btn-outline-dark" onClick={() => removeContent()}>
            Delete Content </button>
            <br />
            <div className='h1'>
              Add content
              <form onSubmit={mySubmitHandler}>
                <p className='lead'>Enter Content Title:</p>
                <textarea
                  class="mb-0"
                  name='title'
                  data-testid="title"
                  onChange={myChangeHandler}
                  style={{width: "250px"}}
                />
                <p className='lead'>Enter Content Body:</p>
                <textarea
                  class="mb-0"
                  name='content'
                  data-testid="body"
                  onChange={myChangeHandler}
                  style={{width: "250px", height: "80px"}}
                />
                <br />
                <input
                  type='submit'
                  className="btn btn-outline-dark"
                  data-testid="Submit"
                />
              </form>
            </div>
        </div>
        <Footer/>
      </div>
    );
  }


export default AddContent;
