<script setup lang="ts">
import ShowList from '@/components/ShowList/ShowList.vue'
import GenresTabs from '@/components/GenresTabs/GenresTabs.vue'
import SearchBar from '@/components/SearchBar/SearchBar.vue'

import { onMounted, computed, ref } from 'vue'
import { useShowStore } from '@/store/showsStore'

const genres = ref<string[]>([])
const showStore = useShowStore()

onMounted(async () => {
  await showStore.getShows()
  genres.value = showStore.genres
  showStore.setGenre('')
})

const isLoading = computed(() => showStore.loading)

const selectGenre = async (selectedGenre: string) => {
  await showStore.getShowsByGenre(selectedGenre)
}

const showsInfo = computed(() => showStore.shows)
</script>

<template>
  <main>
    <h1 class="title">Dashboard</h1>
    <span v-if="isLoading" class="loader">...Loading</span>

    <div v-else>
      <SearchBar />
      <GenresTabs :genres="genres" @select-genre="selectGenre" />
      <ShowList :showsInfo="showsInfo" />
    </div>
  </main>
</template>
