const express = require("express");
const app = express();
const pool = require("./database");
const path = require("path");
require("dotenv").config();

app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());

app.get("/content/", async (req, res) => {
  try {
    const allContent = await pool.query("SELECT * FROM posts");

    res.json(allContent.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/content/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const content = await pool.query(
      "SELECT * FROM posts WHERE content_id = $1",
      [id]
    );

    res.json(content.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/content/add", async (req, res) => {
  try {
    const { title, content, date_created } = req.body;

    const newContent =
      !title || !content || !date_created
        ? res.sendStatus(400)
        : await pool.query(
            "INSERT INTO posts (title, content, date_created) VALUES ($1, $2, $3) RETURNING *",
            [title, content, date_created]
          );

    res.json(newContent.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/content/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updateContent =
      !title || !content
        ? res.sendStatus(400)
        : await pool.query(
            "UPDATE posts SET title = $1, content = $2 WHERE content_id = $3",
            [title, content, id]
          );

    res.json("Content was updated");
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/content/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteContent = await pool.query(
      "DELETE FROM posts WHERE content_id = $1",
      [id]
    );

    res.json("Content was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/users/", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");

    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      id,
    ]);

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/users/add", async (req, res) => {
  try {
    const { email, password, role, date_created } = req.body;

    const newUser =
      !email || !password || !role || !date_created
        ? res.sendStatus(400)
        : await pool.query(
            "INSERT INTO users (email, password, role, date_created) VALUES ($1, crypt($2, gen_salt('bf')), $3, $4) RETURNING *",
            [email, password, role, date_created]
          );

    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, role, date_created } = req.body;

    const updateUser =
      !email || !password || !role
        ? res.sendStatus(400)
        : await pool.query(
            "UPDATE users SET email = $1, password = crypt($2, gen_salt('bf')), role = $3 WHERE user_id = $4",
            [email, password, role, id]
          );

    res.json("User was updated");
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await pool.query(
      "DELETE FROM users WHERE user_id = $1",
      [id]
    );

    res.json("User was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = app;
