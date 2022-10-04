const Contact = require('../models/contactModel');

// console.log(Contact)

async function createContact(body) {
    // return Book.create({ ...body, favorite: Boolean(body.favorite)});
    // return Book.create({ ...body, favorite: !!body.favorite});
    return Contact.create(body);
}

module.exports = {
    createContact,
    // getBookById,
    // getBooks,
    // deleteBook,
    // updateBook
};