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

blogsRouter.get('/:id', db.getNotesById, (request, response) => {
  const id = Number(request.params.id)
  const blog = blogs.find(blog => blog.id === id)

  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', db.createBlogs, (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

blogsRouter.delete('/:id', db.deleteNote, (request, response) => {
  const id = Number(request.params.id)
  blogs = blogs.filter(blog => blog.id !== id)

  response.status(204).end()
})

module.exports = blogsRouter


