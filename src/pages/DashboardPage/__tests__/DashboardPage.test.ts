import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Dashboard from '@/pages/DashboardPage/DashboardPage.vue'
import { useShowStore } from '@/store/showsStore'
import ShowList from '@/components/ShowList/ShowList.vue'
import GenresTabs from '@/components/GenresTabs/GenresTabs.vue'
import SearchBar from '@/components/SearchBar/SearchBar.vue'
import { showsMock } from '@/utils/showsMock'

vi.mock('@/store/showsStore')
vi.mock('@/components/ShowList/ShowList.vue')
vi.mock('@/components/GenresTabs/GenresTabs.vue')
vi.mock('@/components/SearchBar/SearchBar.vue')

describe('Dashboard.vue', () => {
  let mockShowStore

  beforeEach(() => {
    mockShowStore = {
      allShows: showsMock,
      getShows: vi.fn(),
      setGenre: vi.fn(),
      getShowsByGenre: vi.fn(),
      shows: [],
      genres: [],
      loading: false,
    }

    //@ts-ignore
    useShowStore.mockReturnValue(mockShowStore)
  })

  it('renders the loading text when data is loading', async () => {
    mockShowStore.loading = true
    const wrapper = mount(Dashboard)

    const loader = wrapper.find('.loader')
    expect(loader.exists()).toBe(true)
    expect(loader.text()).toBe('...Loading')
  })

  it('renders child components when data is loaded', async () => {
    mockShowStore.loading = false
    mockShowStore.shows = [
      {
        id: 1,
        name: 'Breaking Bad',
        rating: { average: 9.5 },
        image: { medium: 'image-url' },
        summary: '',
        genres: [],
      },
    ]
    const wrapper = mount(Dashboard)

    const showList = wrapper.findComponent(ShowList)
    const genresTabs = wrapper.findComponent(GenresTabs)
    const searchBar = wrapper.findComponent(SearchBar)

    expect(showList.exists()).toBe(true)
    expect(genresTabs.exists()).toBe(true)
    expect(searchBar.exists()).toBe(true)
  })

  it('triggers selectGenre when a genre is selected', async () => {
    mockShowStore.loading = false
    const wrapper = mount(Dashboard)

    await wrapper.findComponent(GenresTabs).vm.$emit('select-genre', 'Comedy')
    expect(mockShowStore.getShowsByGenre).toHaveBeenCalledWith('Comedy')
  })

  it('calls getShows on mounted', async () => {
    mockShowStore.loading = false
    const wrapper = mount(Dashboard)

    await wrapper.vm.$nextTick()
    expect(mockShowStore.getShows).toHaveBeenCalled()
  })
})
