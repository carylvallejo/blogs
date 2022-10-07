const db = require('../models/queries')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const InitialBlog = [
  {
    title: 'Hello',
    author: 'CV',
    url: 'www.hello.com',
    likes: 1,
    id: 1
  },
  {
    title: 'tbz',
    author: 'lsy',
    url:'www.tbz.com',
    likes: 126,
    id: 2
  }
]

beforeEach(async () => {
  await db.deleteMany({})
  // let blogObject = new db(InitialBlog[0])
  // await blogObject.save()
  // blogObject = new db(InitialBlog[1])
  // await blogObject.save()

  for (let blog of InitialBlog) {
    let blogObject = new db(blog)
    await blogObject.save()
  }
  console.log('save')
})

test('verify unique identifier of blog', async () => {
  const res = await api.get('/api/blogs')
  console.log(res.body)
  for (let blog of res.body) {
    console.log(blog.id)
    expect(blog.id).toBeDefined()
  }
})

afterAll(async () => {
  await db.connection.close()
})
