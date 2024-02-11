import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from 'vuex'
import vueDebounce from 'vue-debounce'
import './index.css'

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
    fetchBooks(context) {
      fetch('https://www.dbooks.org/api/recent')
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          context.commit('addBooks', data.books)
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
    }
  }
})

const app = createApp(App)

app.use(router)

app.use(store)

app.directive('debounce', vueDebounce({ lock: true }))

app.mount('#app')
