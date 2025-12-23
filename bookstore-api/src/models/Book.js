// In-memory database for books
let books = [
  {
    id: 1,
    title: "Sememen",
    price: 200,
    author: "Sisay Ngusu",   
  },
  {
    id: 2,
    title: "Alweledm",
    price: 300,
    author: "Abe Gubegna",
  },
  {
    id: 3,
    title: "Fkir Eske Mekabr",
    price: 350,
    author: "Hadis Alemayew",
  }
];

let nextId = 4;

class Book {
  static getAll() {
    return books;
  }

  static getById(id) {
    return books.find(book => book.id === parseInt(id));
  }

  static create(bookData) {
    const newBook = {
      id: nextId++,
      ...bookData
    };
    books.push(newBook);
    return newBook;
  }
}

module.exports = Book;