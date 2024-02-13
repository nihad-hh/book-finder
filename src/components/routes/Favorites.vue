<template>
  <main class="flex justify-center flex-wrap">
    <div v-for="book in this.$store.state.favoriteBooks" :key="book.id" class="flex basis-1/7 m-2">
      <BookCard :currBook="book" />
    </div>
  </main>
</template>

<script>
import BookCard from '../ui-parts/BookCard.vue'
export default {
  name: 'Favorites',
  components: {
    BookCard
  }
}
</script>
