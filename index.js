/*const http = require('http')
const express = require('express')
const db = require('./queries')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', db.getNotes, (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', db.getNotesById, (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/notes', db.createNotes, (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})

app.delete('/api/notes/:id', db.deleteNote, (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

const PORT = 3002
app.listen(PORT)
console.log(`Server running on port ${PORT}`) */

const app = require('./app')
const http = require('http')
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

app.use(cors())

// app.get('/', (request, response) => {
//   response.send('<h1>Hello World!</h1>')
// })

//included sa blogs!!!!
// app.get('/api/blogs', db.getBlogs, (request, response) => {
//   Blog
//     .find({})
//     .then(blogs => {
//       response.json(blogs)
//     })
//   //response.json(blogs)
// })

// app.get('/api/notes/:id', db.getNotesById, (request, response) => {
//   const id = Number(request.params.id)
//   const note = notes.find(note => note.id === id)

//   if (note) {
//     response.json(note)
//   } else {
//     response.status(404).end()
//   }
// })

//included sa blogs!!!
// app.post('/api/blogs', db.createBlogs, (request, response) => {
//   const blog = new Blog(request.body)

//   blog
//     .save()
//     .then(result => {
//       response.status(201).json(result)
//     })
// })
/*const body = request.body

  if (!body.title) {
    return response.status(400).json({
      error: 'title missing'
    })
  }

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  blogs = blogs.concat(blog)

  response.json(blog)
}) */

// app.delete('/api/notes/:id', db.deleteNote, (request, response) => {
//   const id = Number(request.params.id)
//   notes = notes.filter(note => note.id !== id)

//   response.status(204).end()
// })


// const PORT = 3002
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})