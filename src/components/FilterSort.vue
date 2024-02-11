<template>
  <div>
    <Button
      v-for="filterName in filterNames"
      :key="filterName"
      :text="filterName"
      :value="filterName"
      @click="sort"
    />
  </div>
</template>

<script>
import Button from './Button.vue'
import CONSTANTS from '../constants/constants'
export default {
  name: 'FilterSort',
  components: {
    Button
  },
  data() {
    return {
      filterNames: CONSTANTS.filterNames
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
    }
  }
}
</script>
