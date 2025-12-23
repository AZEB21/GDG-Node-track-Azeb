const Book = require('../models/Book');

const bookController = {
  getAllBooks: (req, res) => {
    try {
      const books = Book.getAll();
      res.status(200).json({
        success: true,
        count: books.length,
        data: books
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching books'
      });
    }
  },

  getBookById: (req, res) => {
    try {
      const book = Book.getById(req.params.id);
      
      if (!book) {
        return res.status(404).json({
          success: false,
          message: `Book with ID ${req.params.id} not found`
        });
      }
      
      res.status(200).json({
        success: true,
        data: book
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching book'
      });
    }
  },

  createBook: (req, res) => {
    try {
      const newBook = Book.create(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Book created successfully',
        data: newBook
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating book'
      });
    }
  }
};

module.exports = bookController;