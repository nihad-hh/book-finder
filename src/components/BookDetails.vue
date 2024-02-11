<template>
  <!-- <div>
    <img class="h-32 w-32" :src="book.image" alt="Book image" />
    <h1>{{ book.title }}</h1>
    <h2>{{ book.authors }}</h2>
  </div> -->
  <section className="overflow-hidden text-gray-100">
    <div className="container px-5 pt-32 pb-4 mx-auto sm:py-24">
      <div className="flex flex-wrap items-center mx-auto lg:max-w-5xl">
        <img
          alt="Book image"
          className="object-cover object-center w-full rounded h-1/2 lg:w-1/4"
          :src="book.image"
        />

        <div className="w-full mt-6 lg:w-2/3 lg:pl-10 lg:py-6 lg:mt-0">
          <h2 className="relative text-sm tracking-widest text-gray-500 title-font">
            {{ book.authors }}
            <div className="absolute right-0 sm:bottom-4 sm:relative bottom-24">
              <WishlistButton product="{product}" />
            </div>
          </h2>
          <h1 className="mb-1 text-3xl font-medium text-gray-100 title-font">{{ book.title }}</h1>
          <h2 className="relative text-sm tracking-widest text-gray-500 title-font">
            {{ book.subtitle }}
            <div className="absolute right-0 sm:bottom-4 sm:relative bottom-24">
              <WishlistButton product="{product}" />
            </div>
          </h2>
          <div className="flex mb-4">
            <span className="flex items-center">
              <span className="ml-3 text-gray-600 pr-4 ml-0"> Year: {{ book.year }}</span>
              |
              <span className="ml-3 text-gray-600 pl-2 pr-4"> {{ book.pages }} Pages </span>
              |
              <span className="ml-3 text-gray-600 p-2 pr-4"> {{ book.publisher }}</span>
            </span>
          </div>
          <p className="leading-relaxed">{{ book.description }}</p>
        </div>
      </div>
      <div className="flex flex-wrap mx-auto border-t border-gray-700 lg:max-w-5xl"></div>
    </div>
  </section>
</template>

<script>
import Book from './Book.vue'
export default {
  name: 'BookDetails',
  components: {
    Book
  },
  props: {
    book: { type: Object, required: true }
  }
}
</script>

<style></style>
