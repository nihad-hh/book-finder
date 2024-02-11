<template>
  <div>
    <BookDetails :book="bookById($route.params.bookId)" />
  </div>
</template>

<script>
import BookDetails from './BookDetails.vue'
export default {
  name: 'Details',
  components: {
    BookDetails
  },
  methods: {
    bookById(bookId) {
      let booksCopy = this.$store.state.displayedBooks
      return booksCopy.filter((book) => {
        return book.id === bookId
      })[0]
    }
  }
}
</script>

<style></style>
