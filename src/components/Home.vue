<script>
import BookCard from './BookCard.vue'
import Button from './Button.vue'
import FilterSort from './FilterSort.vue'
export default {
  name: 'Home',
  components: {
    BookCard,
    Button,
    FilterSort
  },
  data() {
    return {
      queryString: ''
    }
  },
  methods: {
    logBooks() {
      console.log(this.$store.state.books)
    },
    searchBooks() {
      this.$store.dispatch('fetchBooksByName', this.queryString)
    },
    loadMoreBooks() {
      this.$store.dispatch('loadMoreBooks')
    }
  }
}
</script>
<template>
  <div>
    <div class="flex justify-center m-8">
      <input
        class="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-5/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-50"
        v-debounce:2000ms="searchBooks"
        placeholder="Search books here"
        v-model="queryString"
        type="text"
      />
    </div>
    <Button v-if="this.$store.state.bookLoaded" text="Filter & Sort" />
    <FilterSort />
    <div v-if="this.$store.state.bookLoaded" class="flex justify-center flex-wrap">
      <div
        v-for="book in this.$store.state.displayedBooks"
        :key="book.id"
        class="flex basis-1/5 m-2"
      >
        <BookCard :currBook="book" />
      </div>
    </div>
    <Button v-if="this.$store.state.bookLoaded" @click="loadMoreBooks" text="Load more books" />
  </div>
</template>
