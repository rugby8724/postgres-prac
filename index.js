import express from 'express'
import dotenv from 'dotenv'

import pool from './db'

dotenv.config()

const app = express()

//ROUTES

//get all todos

// get a todo

// create a todo

// update a todo

// delete a todo

// allows us to parse raw json
app.use(express.json())

// allows us to send form data
app.use(express.urlencoded({extended: true}))

app.listen(3000, () =>{
  console.log("server is listening on port 3000")
})