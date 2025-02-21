import { defineStore } from 'pinia'
import { fetchShows, fetchShowsByGenre } from '@/api/showsApi'
import type { Show } from '@/types/Show'

export const useShowStore = defineStore('shows', {
  state: () => ({
    shows: [] as Show[],
    allShows: [] as Show[],
    genres: [] as string[],
    selectedGenre: null as string | null,
    loading: false,
  }),

  getters: {
    filteredShows: (state) => {
      return state.selectedGenre
        ? state.shows.filter((show) => show.genres.includes(state.selectedGenre!))
        : state.shows
    },
  },

  actions: {
    sortShowsByRating(shows: Show[]): Show[] {
      return shows.sort((a, b) => {
        const ratingA = a.rating?.average || 0
        const ratingB = b.rating?.average || 0
        return ratingB - ratingA
      })
    },

    async getShows() {
      try {
        this.loading = true
        this.shows = await fetchShows()
        this.shows = this.sortShowsByRating(this.shows)
        this.allShows = [...this.shows]
        this.genres = [...new Set(this.shows.flatMap((show) => show.genres))]
      } catch (error) {
        console.error('Error loading shows:', error)
      } finally {
        this.loading = false
      }
    },

    async getShowsByGenre(genre: string) {
      try {
        this.loading = true
        this.selectedGenre = genre
        this.shows = await fetchShowsByGenre(genre)
        this.shows = this.sortShowsByRating(this.shows)
      } catch (error) {
        console.error('Error loading shows by genre:', error)
      } finally {
        this.loading = false
      }
    },

    setGenre(genre: string | null) {
      this.selectedGenre = genre
    },

    searchShow(filteredShows: Show[] | null) {
      this.shows = filteredShows && filteredShows.length > 0 ? filteredShows : this.allShows
      this.selectedGenre = ''
    },
  },
})
