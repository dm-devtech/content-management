const express = require("express")
const app = express()
const pool = require("./database")
require('dotenv').config()

app.use(express.json())

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged Out')
}) // message when logged in

// get all content
app.get("/content/", async (req, res) => {
  try {
    const allContent = await pool.query("SELECT * FROM posts");

    res.json(allContent.rows)
  } catch (err) {
    console.error(err.message);
  }
})

// get one piece of content
app.get("/content/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const content = await pool.query("SELECT * FROM posts WHERE content_id = $1", [id])

    res.json(content.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

// create one piece of content
app.post("/content/add", async (req, res) => {
  try {
    const {title, content} = req.body;

    const newContent = !title || !content ? res.sendStatus(400) : await pool.query(
    "INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *", [title, content]);

    res.json(newContent.rows[0])

  } catch(err){
    console.error(err.message)
  }
})

// update a piece of content
app.put("/content/:id", async (req,res) => {
  try {
    const {id} = req.params;
    const {title, content} = req.body;

    const updateContent = !title || !content ? res.sendStatus(400) : await pool.query("UPDATE posts SET title = $1, content = $2 WHERE content_id = $3", [title, content, id]);

    res.json("Content was updated")

  } catch (err) {
    console.error(err.message)
  }
})

// delete a piece of content
app.delete("/content/:id", async (req,res) => {
  try {
    const {id} = req.params;
    const deleteContent = await pool.query("DELETE FROM posts WHERE content_id = $1", [id])

    res.json("Content was deleted")

  } catch (err) {
    console.error(err.message)
  }
})

module.exports = app
