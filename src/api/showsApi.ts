import axios from 'axios'

const BASE_URL = 'https://api.tvmaze.com/shows'

export const fetchShows = async () => {
  try {
    const response = await axios.get(BASE_URL)
    return response.data
  } catch (error) {
    console.error('Error fetching shows:', error)
    throw error
  }
}

export const fetchShowsByGenre = async (genre: string) => {
  try {
    const response = await axios.get(BASE_URL)
    return response.data.filter((show: any) => show.genres.includes(genre))
  } catch (error) {
    console.error('Error fetching shows by genre:', error)
    throw error
  }
}
