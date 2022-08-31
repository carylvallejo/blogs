const blogsRouter = require('express').Router()
const db = require('../models/queries')

blogsRouter.get('/', db.getBlogs, (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
  //response.json(blogs)
})

blogsRouter.post('/', db.createBlogs, (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogsRouter


//go back to controller/notes