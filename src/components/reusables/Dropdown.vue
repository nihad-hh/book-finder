<template>
  <div class="inline">
    <button
      id="dropdownDefaultButton"
      @click="this.showDropdown = !this.showDropdown"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border border-blue-500 hover:border-transparent rounded"
      type="button"
    >
      {{ buttonText }}
      <svg
        class="w-2.5 h-2.5 ms-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 4 4 4-4"
        />
      </svg>
    </button>

    <!-- Dropdown menu -->
    <div
      v-if="showDropdown"
      class="absolute z-1 bg-[#ffffff] text-[#000000] divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
    >
      <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
        <li v-for="option in options" :key="option" @click="changeButtonText">
          <a
            href="#"
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >{{ option }}</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  data() {
    return {
      showDropdown: false,
      buttonText: this.options[0]
    }
  },
  props: {
    options: {
      Type: Array,
      required: true
    }
  },
  methods: {
    changeButtonText(event) {
      this.buttonText = event.target.text
      this.showDropdown = false
      this.$emit('updateOption', this.buttonText)
    }
  }
}
</script>

<style></style>
