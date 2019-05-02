const express = require('express')
const configureMiddleware = require('./config/middleware.js')
const server = express()

const authenticate = require('./config/authenticate.js')

const users = require('./routes/users.js')
const projects = require('./routes/projects.js')

configureMiddleware(server)

server.get('/', (req, res) => {
  return res.send({ status: 'live' })
})

server.use('/api/users', users)
server.use('/api/projects', authenticate, projects)

module.exports = server