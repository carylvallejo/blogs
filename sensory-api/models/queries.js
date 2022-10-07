const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'repo',
  password: 'postgrespw',
  port: 5432,
})

const getStats = (request, response) => {
  pool.query('SELECT * FROM Article_Stats ORDER BY ArticleStats_Id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getStatsById = (request, response) => {
  const ArticleStats_Id = parseInt(request.params.ArticleStats_Id)

  pool.query('SELECT * FROM Article_Stats WHERE ArticleStats_Id = $1', [ArticleStats_Id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createStats = (request, response) => {
  const { ArticleStats_Upvotes, ArticleStats_Clicks, ArticleStats_Downloads } = request.body

  pool.query('INSERT INTO Article_Stats (ArticleStats_Upvotes, ArticleStats_Clicks, ArticleStats_Downloads) VALUES ($1, $2, $3) RETURNING ArticleStats_Id', [ArticleStats_Upvotes, ArticleStats_Clicks, ArticleStats_Downloads], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Article Stats added with ID: ${results.rows[0].ArticleStats_Id}`)
  })
}

const updateStat = (request, response) => {
  const ArticleStats_Id = parseInt(request.params.ArticleStats_Id)
  const { ArticleStats_Upvotes, ArticleStats_Clicks, ArticleStats_Downloads } = request.body

  pool.query(
    'UPDATE Article_Stats SET ArticleStats_Upvotes = $1, ArticleStats_Clicks = $2, ArticleStats_Downloads = $3 WHERE ArticleStats_Id = $4',
    [ArticleStats_Upvotes, ArticleStats_Clicks, ArticleStats_Downloads, ArticleStats_Id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Stats modified with ID: ${ArticleStats_Id}`)
    }
  )
}

const deleteStat = (request, response) => {
  const ArticleStats_Id = parseInt(request.params.ArticleStats_Id)

  pool.query('DELETE FROM Article_Stats WHERE ArticleStats_Id = $1', [ArticleStats_Id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Stat deleted with ID: ${ArticleStats_Id}`)
  })
}

module.exports = {
  getStats,
  getStatsById,
  createStats,
  updateStat,
  deleteStat,
}