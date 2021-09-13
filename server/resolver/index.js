const {books, authors} = require('../data/static.js')

const Author = require('../models/Author')
const Book = require('../models/Book')

const resolvers = {
  Query: {
    books: () => books,
    book: (parent,args)=> books.find(book => book.id == args.id),
    authors: () => authors,
    author: (parent,args)=> authors.find(author => author.id == args.id)
  },
  Book: {
    author: (parent,args) => {
      return authors.find(author => author.id == parent.authorId)
    }
  },
  Author: {
    books : (parent,args) =>
      books.filter(book => book.authorId === parent.id)
  },

  ////MUTATION 
  Mutation: {
    createAuthor:async (parent,args) => {
      const newAuthor = new Author(args)
      return await newAuthor.save()
    },
    createBook:async (parent,args) => {
      const newBook = new Book(args)
      return await newBook.save()
    }
  }

}


module.exports = resolvers;