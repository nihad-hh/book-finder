<template>
  <div>
    <Button
      v-for="filterName in filterNames"
      :key="filterName"
      :text="filterName"
      :value="filterName"
      @click="sort"
    />
    <div>
      <Dropdown
        @updateOption="(optionText) => (this.pagesSelector = optionText)"
        :options="['Less than', 'More than']"
      />
      <input
        class="bg-gray-50 border border-gray-300 text-black text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-[100px] p-2.5 mx-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-50 Class Properties block display: block; inline-block display: inline-block; inline"
        placeholder="Pages"
        v-model="pagesQuery"
        type="number"
      />
    </div>
    <div>
      <Dropdown
        @updateOption="(optionText) => (this.yearsSelector = optionText)"
        :options="['Older than', 'Newer than']"
      />
      <input
        class="bg-gray-50 border border-gray-300 text-black text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-[100px] p-2.5 mx-2 mt-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-50 Class Properties block display: block; inline-block display: inline-block; inline"
        placeholder="Year"
        v-model="yearQuery"
        type="number"
      />
    </div>
    <Button text="Apply filters" @click="applyFilter" />
  </div>
</template>

<script>
import Button from '../reusables/Button.vue'
import Dropdown from '../reusables/Dropdown.vue'
import CONSTANTS from '../../constants/constants'
export default {
  name: 'FilterSort',
  components: {
    Button,
    Dropdown
  },
  data() {
    return {
      filterNames: CONSTANTS.filterNames,
      pagesQuery: undefined,
      yearQuery: undefined,
      pagesSelector: 'Less than',
      yearsSelector: 'Older than'
    }
  },
  methods: {
    sort(event) {
      let text = event.target.value.split(' ')
      let property = text[0].toLowerCase()
      let sortingOrder = undefined

      if (text[1].includes('-')) {
        let order = text[1].split('-')
        sortingOrder = order[1] === 'A' ? 'asc' : 'desc'
      } else {
        sortingOrder = text[1]
      }
      this.$store.dispatch('applySortFilter', { property, sortingOrder })
    },
    applyFilter() {
      let filterObj = {
        pagesSelector: this.pagesSelector,
        pagesQuery: this.pagesQuery,
        yearsSelector: this.yearsSelector,
        yearQuery: this.yearQuery
      }
      this.$store.dispatch('applyFilter', filterObj)
    }
  }
}
</script>
