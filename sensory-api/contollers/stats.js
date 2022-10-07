const statsRouter = require('express').Router()
const Stat = require('../models/queries')

statsRouter.get('/', Stat.getStats, (request, response) => {
  Stat.find({}).then(stats => {
    response.json(stats)
  })
})

statsRouter.get('/:ArticleStats_Id', Stat.getStatsById, (request, response, next) => {
  Stat.findById(request.params.ArticleStats_Id)
    .then(stat => {
      if (stat) {
        response.json(stat)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

statsRouter.post('/', Stat.createStats, (request, response, next) => {
  const stat = new Stat(request.body)

  stat.save()
    .then(result => {
      response.status(201).json(result)
    })
    //.catch(error => next(error))
})

statsRouter.delete('/:ArticleStats_Id', Stat.deleteStat, (request, response, next) => {
  Stat.findByIdAndRemove(request.params.ArticleStats_Id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

statsRouter.put('/:ArticleStats_Id', Stat.updateStat, (request, response, next) => {
  const body = request.body
  const ArticleStats_Id = Number(request.params.ArticleStats_Id)
  const stats = stats.find(stat => stat.ArticleStats_Id !== ArticleStats_Id)

  const stat = {
    ArticleStats_Upvotes: body.ArticleStats_Upvotes,
    ArticleStats_Clicks: body.ArticleStats_Clicks,
    ArticleStats_Downloads: body.ArticleStats_Downloads,
  }

  response.status(404).end()
  // Stat.findByIdAndUpdate(request.params.ArticleStats_Id, stat, { new: true })
  //   .then(updatedStat => {
  //     response.json(updatedStat)
  //   })
  //   .catch(error => next(error))
})

module.exports = statsRouter