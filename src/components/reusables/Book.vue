<template>
  <div>
    <img class="h-32 w-32" :src="book.image" alt="Book image" />
    <h1>{{ book.title }}</h1>
    <h2>{{ book.authors }}</h2>
  </div>
</template>

<script>
export default {
  name: 'Book',
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  methods: {}
}
</script>
