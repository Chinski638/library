function findById(items, id) {
  return items.find(item => item.id === id)
}
function sortByProperty(items, property) {
  return items.sort((a, b) => a[property].localeCompare(b[property]))
}

function attachAuthorsToBooks(books, authors) {
  return books.map(book => {
    const author = findById(authors, book.authorId)
    return { ...book, author }
  });
}

function findAccountById(accounts, id) {
  return findById(accounts, id)
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a, b) => a.name.last.localeCompare(b.name.last));
}

function getTotalNumberOfBorrows(account, books) {
  let totalBorrows = 0

  books.forEach(book => {
    const borrows = book.borrows.filter(borrow => borrow.id === account.id)
    totalBorrows += borrows.length
  })

  return totalBorrows
}

function getBooksPossessedByAccount(account, books, authors) {
  const borrowedBooks = books.filter(book => 
    book.borrows.some(borrow => borrow.id === account.id && !borrow.returned)
  )

  return attachAuthorsToBooks(borrowedBooks, authors)
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
}
