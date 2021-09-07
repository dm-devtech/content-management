const postContent = async(title, content) => {
    try {
      const post = await fetch('/content/add',{
        method:'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({title: title, content: content, date_created: 'NOW()'})
      })
    } catch (err) {
      console.error(err.message);
    }
  }

  export default postContent