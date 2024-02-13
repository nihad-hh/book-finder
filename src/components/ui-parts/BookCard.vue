<template>
  <div
    class="flex flex-col items-center self-start border border-gray-900 rounded-lg hover:bg-gray-800 hover:border hover:border-gray-700"
  >
    <div class="relative">
      <img class="p-4 rounded-t-lg w-56 h-80" :src="currBook.image" alt="Book image" />
    </div>
    <div class="flex flex-col flex-wrap content-between justify-center px-4 pb-2 align-middle">
      <h5
        class="w-32 h-12 text-base font-semibold tracking-tight text-gray-100 lg:w-48 lg:text-lg lg:h-14 line-clamp-2"
      >
        {{ currBook.title }}
      </h5>
      <h3
        class="w-32 h-12 text-base tracking-tight text-gray-100 lg:w-48 lg:text-lg lg:h-14 line-clamp-2"
      >
        {{ currBook.authors }}
      </h3>
      <div class="flex items-center justify-between">
        <RouterLink :to="{ name: 'details', params: { bookId: currBook.id } }">
          <Button class="mx-0 text-[12px]" text="Details" />
        </RouterLink>
        <Button
          class="text-[12px]"
          :text="isBookFav(currBook) ? 'Remove from Favorites' : 'Add to favorites'"
          @click="
            isBookFav(currBook) ? removeBookFromFavorites(currBook) : addBookToFavorites(currBook)
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
import Button from '../reusables/Button.vue'
export default {
  name: 'BookCard',
  components: { Button },
  setup() {},
  data() {
    return {
      favsText: 'Add to Favorites'
    }
  },
  props: {
    currBook: {
      type: Object
    }
  },
  methods: {
    addBookToFavorites(book) {
      this.$store.dispatch('addBookToFavorites', book)
    },
    removeBookFromFavorites(book) {
      this.$store.dispatch('removeBookFromFavorites', book)
    },
    isBookFav(book) {
      let favBooks = this.$store.getters.getFavBooks
      return favBooks.includes(book)
    }
  }
}
</script>
