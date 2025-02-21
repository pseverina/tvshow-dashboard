<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useShowStore } from '@/store/showsStore'
import { useRoute } from 'vue-router'
import movieImg from '@/assets/icons/movie-img.svg'
import type { Show } from '@/types/Show'
import { useRouter } from 'vue-router'

const route = useRoute()
const showStore = useShowStore()
const showInfo = ref<Show | null>(null)
const showId = Number(route.params.id)
const router = useRouter()

onMounted(async () => {
  showInfo.value =
    showStore.allShows.find((show) => {
      return show.id === showId
    }) ?? null
})
</script>

<template>
  <div v-if="showInfo" class="details">
    <h1 class="title">{{ showInfo.name }}</h1>
    <div class="details-wrapper">
      <div class="details-text-wrapper">
        <span class="details-text-language"><i>Language:</i> {{ showInfo.language }}</span>
        <span>
          <i>Genre: </i>
          <span v-for="(genre, index) in showInfo.genres" :key="index" class="details-text-genre">
            {{ genre }},
          </span>
        </span>
        <span class="details-text-dates">
          <i>Show dates: </i>
          <span v-for="(day, index) in showInfo.schedule.days" :key="index">{{ day }},</span>
        </span>
        <span class="details-text-time"><i>Show time: </i>{{ showInfo.schedule.time }}</span>
        <span><i>Official site: </i>{{ showInfo.officialSite }}</span>
        <span><i>Premier date: </i>{{ showInfo.premiered }}</span>
        <span><i>End data: </i>{{ showInfo.ended }}</span>
        <span @click="router.push('/')" class="back-link">Back to Dashboard</span>
      </div>
      <img :src="showInfo.image?.medium ?? showInfo.image?.original ?? movieImg" />
    </div>
  </div>
</template>
