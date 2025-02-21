<template>
  <div class="input-wrapper">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search for a show by name"
      @input="onSearch"
      class="input"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useShowStore } from '@/store/showsStore'

const showStore = useShowStore()
const searchQuery = ref('')

const debounceDelay = 500
let debounceTimeout: ReturnType<typeof setTimeout>

const onSearch = () => {
  clearTimeout(debounceTimeout)

  debounceTimeout = setTimeout(() => {
    if (searchQuery.value.trim()) {
      const filteredShows = showStore.allShows.filter((show) =>
        show.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
      )

      showStore.searchShow(filteredShows.length > 0 ? filteredShows : null)
    } else {
      showStore.searchShow(null)
    }
  }, debounceDelay)
}
</script>
