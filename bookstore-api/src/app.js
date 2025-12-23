const express = require('express');
const bookRoutes = require('./routes/bookRoutes');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Bookstore API',
    endpoints: {
      getBooks: 'GET /api/books',
      getBook: 'GET /api/books/:id',
      createBook: 'POST /api/books'
    }
  });
});

// API Routes
app.use('/api/books', bookRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Bookstore API running on http://localhost:${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`  GET  http://localhost:${PORT}/api/books`);
  console.log(`  GET  http://localhost:${PORT}/api/books/:id`);
  console.log(`  POST http://localhost:${PORT}/api/books`);
});

module.exports = app;