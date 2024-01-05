const express = require('express')
const dotenv = require('dotenv')

const pool = require("./db")

// Get the directory path of the current module


dotenv.config()

const app = express()

// allows us to parse raw json
app.use(express.json())

// allows us to send form data
app.use(express.urlencoded({ extended: true }))

// ROUTES

// get all todos
app.get("/todos", async (req, res)=> {
  try{
    const allTodos = await pool.query("SELECT * FROM todo")
    res.json(allTodos.rows)
  }catch (err) {
    console.error(err.message)
    res.status(500).send("Internal Server Error")
  }
})
// get a todo
app.get("/todos/:id", async (req, res) => {
  const {id} = req.params
  try {
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
    res.json(todo.rows[0])
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Internal Server Error")
  }
})

// create a todo
app.post("/todos", async (req, res) => {
  try {
    //await
    const { description } = req.body
    const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description])
    res.json(newTodo.rows[0])
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Internal Server Error")
  }
})

// update a todo
app.put("/todos/:id", async (req, res)=> {
  try {
    const {id} = req.params //WHERE
    const {description} = req.body //SET

    const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id])

    res.json("Todo was updated")
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Internal Server Error")
  }
})

// delete a todo
app.delete("/todos/:id", async (req, res) =>{
  const {id} = req.params
  const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])
  res.json('Todo was deleted')
})

app.listen(3000, () => {
  console.log("server is listening on port 3000")
})