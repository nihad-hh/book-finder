<template>
  <main class="flex justify-center flex-wrap">
    <div v-for="book in this.$store.state.favoriteBooks" :key="book.id" class="flex basis-1/5 m-2">
      <BookCard :currBook="book" />
    </div>
  </main>
</template>

<script>
import BookCard from './BookCard.vue'
export default {
  name: 'Favorites',
  components: {
    BookCard
  }
}
</script>
