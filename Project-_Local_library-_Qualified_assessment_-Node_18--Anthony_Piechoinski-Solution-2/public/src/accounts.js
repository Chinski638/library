function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id)
}

function sortAccountsByLastName(accounts) {
  accounts.sort((a, b) => {
    return a.name.last.localeCompare(b.name.last)
  });
  return accounts
}

function getTotalNumberOfBorrows(account, books) {
  const borrowedBooks = []
  
  for (let i = 0; i < books.length; i++) {
    const book = books[i]
    const borrows = book.borrows
    
    for (let b = 0; b < borrows.length; b++) {
      if (borrows[b].id === account.id) {
        borrowedBooks.push(borrows[b])
      }
    }
  }
  return borrowedBooks.length
}


function getBooksPossessedByAccount(account, books, authors) {
  const borrowedBooks = books.filter(book => {
    const borrowed = book.borrows.some(borrow => borrow.id === account.id && !borrow.returned)
    return borrowed
  });
  
  borrowedBooks.forEach(book => {
    const author = authors.find(author => author.id === book.authorId)
    book.author = author
  })
  
  return borrowedBooks
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
