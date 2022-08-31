const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'blogsdb',
  password: 'postgrespw',
  port: 5432,
})

const getBlogs = (request, response) => {
  pool.query('SELECT * FROM blogs ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getNotesById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM blogs WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createBlogs = (request, response) => {
  const { title, author, url, likes } = request.body

  pool.query('INSERT INTO blogs (title, author, url, likes) VALUES ($1, $2, $3, $4) RETURNING id', [title, author, url, likes], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`Blog added with ID: ${results.rows[0].id}`);
  })
}

const updateNote = (request, response) => {
  const id = parseInt(request.params.id)
  const { content } = request.body

  pool.query(
    'UPDATE blogs SET content = $1 WHERE id = $2',
    [content, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Notes modified with ID: ${id}`)
    }
  )
} 

const deleteNote = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM blogs WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Note deleted with ID: ${id}`)
  })
}  

module.exports = {
  getBlogs,
  getNotesById,
  createBlogs,
  updateNote,
  deleteNote,
}