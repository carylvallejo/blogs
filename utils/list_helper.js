//const _ = require('lodash')

//4.3
const dummy = () => {
  return 1
}

//4.4
const totalLikes = (blogs) => {
  const reducer = (previousValue, currentValue) => {
    return previousValue + currentValue.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

//4.5
const favoriteBlog = (multipleBlogs) => {
  const hastMostLikes = multipleBlogs.reduce((previousValue, currentValue) => {
    if (previousValue.likes > currentValue.likes) {
      return previousValue
    } else {
      return currentValue
    }
  })

  return {
    title: hastMostLikes.title,
    author: hastMostLikes.author,
    likes: hastMostLikes.likes,
  }
}

//4.6
// const mostBlogs = (blogs) => {
//   const blogAmount = _.countBy(blogs, 'author')
//   console.log( _.countBy(blogs, 'author'))
//   const topAuthor = Object.keys(blogAmount).reduce((previousValue, currentValue) => {
//     if (blogAmount.previousValue > blogAmount.currentValue) {
//       return previousValue
//     } else {
//       return currentValue
//     }
//   })

//   return {
//     author: topAuthor,
//     blogs: blogAmount[topAuthor]
//   }
// }

//4.7
// const mostLikes = (blogs) => {
//   const likeAmount = _.sumBy(blogs, 'likes')
//   console.log( _.sumBy(blogs, 'likes'))
// 	//const likeAmount = Math.max
//   const likesAuthor = Object.keys(likeAmount).reduce((previousValue, currentValue) => {
//     if (likeAmount.previousValue > likeAmount.currentValue) {
//       return previousValue.likes
//     } else {
//       return currentValue.likes
//     }
//   })

//   return {
//     author: likesAuthor,
//     likes: likeAmount
//   }
// }

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  //mostBlogs
}