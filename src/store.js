import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      books: undefined,
      displayedBooks: [],
      bookLoaded: false,
      favoriteBooks: [],
      filterSortActive: false,
      booksFilteredSorted: []
    }
  },
  getters: {
    getFavBooks(state) {
      return state.favoriteBooks
    }
  },
  mutations: {
    initialiseStore(state) {
      this.replaceState(Object.assign(state, JSON.parse(localStorage.getItem('store'))))
    },
    addDisplayedBook(state, books) {
      state.displayedBooks = state.displayedBooks.concat(books)
    },
    setDisplayedBooks(state, books) {
      state.displayedBooks = books
    },
    setBooks(state, newBooks) {
      state.books = newBooks
    },
    booksLoadedFlag(state) {
      state.bookLoaded = true
    },
    setBooksSortFilterFlag(state) {
      state.filterSortActive = true
    },
    resetBooksSortFlilterFlag(state) {
      state.filterSortActive = false
    },

    addBookToFavorites(state, book) {
      state.favoriteBooks.push(book)
    },
    removeBookFromFavorites(state, book) {
      const index = state.favoriteBooks.indexOf(book)
      state.favoriteBooks.splice(index, 1)
    }
  },
  actions: {
    initialiseStore(context) {
      if (localStorage.getItem('store')) {
        // Replace the state object with the stored item

        context.commit('initialiseStore')
      } else {
        context.dispatch('fetchRecentBooks')
      }
    },
    async fetchBooksWithDetails(context, books) {
      let promises = []

      let currentBook = 1

      while (currentBook <= books.length) {
        // api had faulty data, server error when id has X in it
        if (!books[currentBook - 1].id.includes('X')) {
          promises.push(fetch('https://www.dbooks.org/api/book/' + books[currentBook - 1].id))
        }
        currentBook++
      }

      let loadedBooks = await Promise.all(promises)

      let numOfBooks = loadedBooks.length
      currentBook = 1
      promises = []
      while (currentBook <= numOfBooks) {
        promises.push(loadedBooks[currentBook - 1].json())
        currentBook++
      }

      loadedBooks = await Promise.all(promises)
      return loadedBooks
    },
    fetchRecentBooks(context) {
      fetch('https://www.dbooks.org/api/recent')
        .then((response) => {
          return response.json()
        })
        .then(async (data) => {
          context.commit('setBooks', data.books)
          let recentBooks = await context.dispatch('fetchBooksWithDetails', data.books.slice(0, 10))
          context.dispatch('setDisplayedBooks', recentBooks)
          context.commit('booksLoadedFlag')
        })
    },
    async fetchBooksByName(context, name) {
      let booksResponse = await fetch('https://www.dbooks.org/api/search/' + name)
      let booksdata = await booksResponse.json()
      context.commit('setBooks', booksdata.books)
      context.commit('booksLoadedFlag')
      context.dispatch('fetchNewBooks')
    },
    async fetchNewBooks(context) {
      context.commit('resetBooksSortFlilterFlag')
      const len = context.state.displayedBooks.length
      const newBooks = context.state.books.slice(len, len + 11)

      let loadedBooks = await context.dispatch('fetchBooksWithDetails', newBooks)
      context.commit('setDisplayedBooks', loadedBooks)
    },
    addBookToFavorites(context, book) {
      context.commit('addBookToFavorites', book)
    },
    removeBookFromFavorites(context, book) {
      context.commit('removeBookFromFavorites', book)
    },
    setDisplayedBooks(context, books) {
      context.commit('setDisplayedBooks', books)
    },
    async applySortFilter(context, sortingObj) {
      context.commit('setBooksSortFilterFlag')

      let property = sortingObj.property
      let sortingOrder = sortingObj.sortingOrder

      context.state.booksFilteredSorted = context.state.books
      context.state.booksFilteredSorted.sort((book1, book2) => {
        if (sortingOrder === 'asc') {
          return book1[property].toLowerCase() < book2[property].toLowerCase() ? 1 : -1
        } else {
          return book1[property].toLowerCase() > book2[property].toLowerCase() ? 1 : -1
        }
      })

      let loadedBooks = await context.dispatch(
        'fetchBooksWithDetails',
        context.state.booksFilteredSorted.slice(0, 11)
      )
      context.dispatch('setDisplayedBooks', loadedBooks)
    },
    async loadMoreBooks(context) {
      let lenDispBooks = context.state.displayedBooks.length
      let newBooks = undefined
      if (context.state.filterSortActive) {
        newBooks = context.state.booksFilteredSorted.slice(lenDispBooks, lenDispBooks + 10)
      } else {
        newBooks = context.state.books.slice(lenDispBooks, lenDispBooks + 10)
      }
      let newBooksWithDetails = await context.dispatch('fetchBooksWithDetails', newBooks)
      context.commit('addDisplayedBook', newBooksWithDetails)
    },
    async applyFilter(context, filterObj) {
      // set filter tag
      context.commit('setBooksSortFilterFlag')

      // books filtering, only currently displayed books are filtered
      let filteredBooks = context.state.displayedBooks

      if (filterObj.pagesQuery) {
        filteredBooks = filteredBooks.filter((book) => {
          if (filterObj.pagesSelector === 'More than') {
            return book.pages > filterObj.pagesQuery
          } else {
            return book.pages < filterObj.pagesQuery
          }
        })
      }

      if (filterObj.yearQuery) {
        filteredBooks = filteredBooks.filter((book) => {
          if (filterObj.yearsSelector === 'Newer than') {
            return book.year > filterObj.yearQuery
          } else {
            return book.year < filterObj.yearQuery
          }
        })
      }

      // fetchBooksWithDetails
      let filteredBooksWithDetails = await context.dispatch('fetchBooksWithDetails', filteredBooks)

      // setDisplayedBooks
      context.dispatch('setDisplayedBooks', filteredBooksWithDetails)
    }
  }
})

store.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state))
})

export default store
