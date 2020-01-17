// import express 
const express = require('express')
// import posts router
const postsRouter = require('./posts/posts-router') 
// import cors
const cors = require('cors')
//get the datatbase
const db = require('./data/db')
// create server
const server = express()
//set server to use json format
server.use(express.json())
//set server to use cors
server.use(cors())
// handle root request
server.get('/', (req, res) => {
    res.send('hello from the root')
})
// set server to use the foute for posts
server.use('/api/posts', postsRouter)

//port connections for server
server.listen(5000, () => {
    console.log('running on port 5000')
})