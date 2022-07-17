require('dotenv').config()

const express = require('express')
const app     = express()
const port    = process.env.PORT

// use helmet
const helmet = require('helmet')
app.use(helmet())

// use cors
const cors = require('cors')
app.use(cors())

// use body-parser = express
app.use(express.json())
app.use(express.urlencoded({ extended: true, }))

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})

// ROUTES
// :: /auth
app.use('/auth', require('./routers/auth'))
// :: /games
app.use('/games', require('./routers/games'))
// :: /players
app.use('/players', require('./routers/players'))
// :: /levels
app.use('/levels', require('./routers/levels'))
// :: /quest-types
app.use('/quest-types', require('./routers/quest_types'))
// :: /questions
app.use('/questions', require('./routers/questions'))
// :: /choices
app.use('/choices', require('./routers/choices'))

// serve
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
