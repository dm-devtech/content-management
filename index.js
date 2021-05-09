const express = require("express")
const app = express()
const pool = require("./database")
require('dotenv').config()

app.use(express.json())

// ROUTES
// Course content

// to get all content
app.get("/content/", async (req, res) => {
  try {
    const allContent = await pool.query("SELECT * FROM posts");

    res.json(allContent.rows)
  } catch (err) {
    console.error(err.message);
  }
})

// to get one piece of content
app.get("/content/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const content = await pool.query("SELECT * FROM posts WHERE content_id = $1", [id])

    res.json(content.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

// to create one piece of content
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

// to update a piece of content
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

// to delete a piece of content
app.delete("/content/:id", async (req,res) => {
  try {
    const {id} = req.params;
    const deleteContent = await pool.query("DELETE FROM posts WHERE content_id = $1", [id])

    res.json("Content was deleted")

  } catch (err) {
    console.error(err.message)
  }
})

// ROUTES
// Users

// to get all users
app.get("/users/", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");

    res.json(allUsers.rows)
  } catch (err) {
    console.error(err.message);
  }
})

// to get one user
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [id])

    res.json(user.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

// to create one user
app.post("/users/add", async (req, res) => {
  try {
    const {email, password, role} = req.body;

    const newUser = !email || !password || !role ? res.sendStatus(400) : await pool.query(
    "INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING *", [email, password, role]);

    res.json(newUser.rows[0])

  } catch(err){
    console.error(err.message)
  }
})

// to update a user
app.put("/users/:id", async (req,res) => {
  try {
    const {id} = req.params;
    const {email, password, role} = req.body;

    const updateUser = !email || !password || !role ? res.sendStatus(400) : await pool.query("UPDATE users SET email = $1, password = $2, role = $3 WHERE user_id = $4", [email, password, role, id]);

    res.json("User was updated")

  } catch (err) {
    console.error(err.message)
  }
})

// to delete a user
app.delete("/users/:id", async (req,res) => {
  try {
    const {id} = req.params;
    const deleteUser = await pool.query("DELETE FROM users WHERE user_id = $1", [id])

    res.json("User was deleted")

  } catch (err) {
    console.error(err.message)
  }
})

module.exports = app
