export type Show = {
  id: number
  url: string
  name: string
  type: string
  language: string
  genres: string[]
  status: string
  averageRuntime: number | null
  premiered: string | null
  ended: string | null
  officialSite: string | null
  schedule: {
    time: string
    days: string[]
  }
  rating: { average: number | null }
  network: {
    id: number
    name: string
    country: {
      name: string
      code: string
      timezone: string
    }
    officialSite: string | null
  } | null
  image: {
    medium: string
    original: string
  } | null
  summary: string
  updated: number
}
