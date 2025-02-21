<script setup>
import { useShowStore } from '@/store/showsStore'
import { computed } from 'vue'

defineProps({
  genres: {
    type: Array,
    required: true,
  },
})

const showStore = useShowStore()
const isGenreSelected = computed(() => showStore.selectedGenre)

const emit = defineEmits()
const selectGenre = (genre) => {
  emit('select-genre', genre)
}
</script>

<template>
  <div class="tabs">
    <a
      href="#"
      v-for="(genre, index) in genres"
      :key="index"
      :class="isGenreSelected === genre ? 'tab tab--selected' : 'tab'"
      @click.prevent="selectGenre(genre)"
      >{{ genre }}</a
    >
  </div>
</template>
