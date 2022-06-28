require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT

// use helmet
const helmet = require('helmet')
app.use(helmet())

// use body-parser = express
app.use(express.json())
app.use(express.urlencoded({ extended: true, }))

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})

// serve
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
