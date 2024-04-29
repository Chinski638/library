function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  let totalBorrowed = 0
  for (let i = 0; i < books.length; i++) {
    if (!books[i].borrows[0].returned) {
      totalBorrowed++
    }
  }
  return totalBorrowed
}


function getMostCommonGenres(books) {
  const genreCounts = books.reduce((acc, book) => {
    if (!acc[book.genre]) {
      acc[book.genre] = 0
    }
    acc[book.genre]++
    return acc
  }, {})

  const sortedGenres = Object.entries(genreCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 5)

  const result = sortedGenres.map(([genre, count]) => ({ name: genre, count }))
  return result
}

function getMostPopularBooks(books) {
  const result = []

  const borrowCounts = books.reduce((acc, book) => {
    acc[book.title] = book.borrows.length
    return acc
  }, {})

  const sortedBooks = Object.entries(borrowCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 5)

  sortedBooks.forEach(([title, count]) => {
    result.push({ name: title, count })
  })
  return result
}

function getMostPopularAuthors(books, authors) {
  const result = []

  const borrowCounts = books.reduce((acc, book) => {
    const author = authors.find(author => author.id === book.authorId)
    if (!acc[author.id]) {
      acc[author.id] = { name: `${author.name.first} ${author.name.last}`, count: 0 }
    }
    acc[author.id].count += book.borrows.length
    return acc
  }, {})
  const sortedAuthors = Object.values(borrowCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  sortedAuthors.forEach(author => {
    result.push({ name: author.name, count: author.count })
  })
  return result
}



module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
