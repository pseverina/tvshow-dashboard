<script setup>
import { useRouter } from 'vue-router'
import movieImg from '@/assets/icons/movie-img.svg'

defineProps({
  showsInfo: {
    type: Array,
    required: true,
  },
})

const router = useRouter()
const goToDetails = (id) => {
  router.push(`/${id}`)
}
</script>

<template>
  <ul class="list">
    <li v-for="show in showsInfo" :key="show.id" class="list__card" @click="goToDetails(show.id)">
      <span class="list__title">
        <h3 class="list__header">"{{ show.name }}"</h3>
        <span class="list__rating">{{ Object.values(show.rating).toString() }}</span>
      </span>
      <img :src="show.image?.medium ?? show.image?.original ?? movieImg" />
    </li>
  </ul>
</template>
