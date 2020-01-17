// import express router
const router = require('express').Router()

// import database
const db = require('../data/db')

//export router
module.exports = router
// create a post from the info sent.
router.post('/', (req, res) => {
    const { title, contents } = req.body
    !title || ! contents ?
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." }):
    db.insert(req.body)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        })
})
// get an array of all the posts
router.get('/', (req, res) => {
    db.find()
        .then(post => {
            res.status(200).json(post)
        })
        .catch(err => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})
//get post by id
router.get('/:id', (req, res) => {
    db.findById(req.params.id)
        .then(post => {
            !post[0] ? 
            res.status(404).json({ message: "The post with the specified ID does not exist." }) :
            res.status(200).json(post)
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
})
// creates comment on the post id
router.post('/:id/comments', (req, res) => {
    
    db.findById(req.params.id)
        .then(post => {
           !post[0] ?
            res.status(404).json({ message: "The post with the specified ID does not exist." }) :
            req.body.text ?
            db.insertComment(req.body)
                .then(post => res.status(201).json(post)) :
            res.status(400).json({ errorMessage: "Please provide text for the comment." })
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the comment to the database" })
        })
})
//gets comments by post id
router.get('/:id/comments', (req, res) => {
    db.findPostComments(req.params.id)
        .then(post => {
            !post[0] ?
            res.status(404).json({ message: "The post with the specified ID does not exist." }) :
            res.status(200).json(post)
        })
        .catch(err => {
            res.status(500).json({ error: "The comments information could not be retrieved." })
        })
})
//delete a post
router.delete('/:id', (req, res) => {
    db.findById(req.params.id)
        .then(post => {
            post[0] ?
            db.remove(req.params.id)
                .then(post => {
                    res.status(200).json({message: 'Post was removed'})
                }) :
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        })
        .catch(err => {
            res.status(500).json({ error: "The post could not be removed" })
        })
})
//update a post
router.put('/:id', (req, res) => {
    const { title, contents } = req.body
    !title || !contents ?
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." }) :
    db.findById(req.params.id)
        .then(post => {
            post[0] ?
            db.update(req.params.id, req.body)
                .then(post => {
                    res.status(200).json(post)
                }) :
            res.status(404).json({ message: "The post with the specified ID does not exist." })
            
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be modified." })
        })
})
