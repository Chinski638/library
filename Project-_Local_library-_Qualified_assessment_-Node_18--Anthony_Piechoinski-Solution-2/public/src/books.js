function findAuthorById(authors, id) {
  return authors.find(author => author.id === id)
}

function findBookById(books, id) {
  return books.find(book => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  const checkedOut = []
  const returned = []
  for (let i = 0; i < books.length; i++) {
    const book = books[i]
    if (book.borrows[0].returned) {
      returned.push(book)
    } else {
      checkedOut.push(book)
    }
  }
  return [checkedOut, returned]
}

function getBorrowersForBook(book, accounts) {
  const borrowers = []
  const borrowedIDs = book.borrows
  
  for (let i = 0; i < borrowedIDs.length && borrowers.length < 10; i++) {
    const borrow = borrowedIDs[i]
    const matchingAccount = accounts.find(account => account.id === borrow.id)
    const borrowerInfo = {
      id: matchingAccount.id,
      returned: borrow.returned,
      picture: matchingAccount.picture,
      age: matchingAccount.age,
      name: matchingAccount.name,
      company: matchingAccount.company,
      email: matchingAccount.email,
      registered: matchingAccount.registered,
    }
    borrowers.push(borrowerInfo)
  }
  return borrowers
}



module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
