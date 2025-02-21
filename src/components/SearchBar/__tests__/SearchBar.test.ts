import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useShowStore } from '@/store/showsStore'
import SearchBar from '@/components/SearchBar/SearchBar.vue'
import type { Show } from '@/types/Show'

vi.mock('@/store/showsStore', () => ({
  useShowStore: vi.fn(),
}))

describe('SearchBar.vue', () => {
  let mockStore: {
    allShows: Show[]
    searchShow: vi.Mock
  }

  beforeEach(() => {
    mockStore = {
      allShows: [
        {
          name: 'Breaking Bad',
          id: 0,
          url: '',
          type: '',
          language: '',
          genres: [],
          status: '',
          averageRuntime: null,
          premiered: null,
          ended: null,
          officialSite: null,
          schedule: {
            time: '',
            days: [],
          },
          rating: {
            average: null,
          },
          network: null,
          image: null,
          summary: '',
          updated: 0,
        },
        {
          name: 'Stranger Things',
          id: 1,
          url: '',
          type: '',
          language: '',
          genres: [],
          status: '',
          averageRuntime: null,
          premiered: null,
          ended: null,
          officialSite: null,
          schedule: {
            time: '',
            days: [],
          },
          rating: {
            average: null,
          },
          network: null,
          image: null,
          summary: '',
          updated: 0,
        },
        {
          name: 'Game of Thrones',
          id: 2,
          url: '',
          type: '',
          language: '',
          genres: [],
          status: '',
          averageRuntime: null,
          premiered: null,
          ended: null,
          officialSite: null,
          schedule: {
            time: '',
            days: [],
          },
          rating: {
            average: null,
          },
          network: null,
          image: null,
          summary: '',
          updated: 0,
        },
      ],
      searchShow: vi.fn(),
    }

    useShowStore.mockReturnValue(mockStore)
  })

  it('renders search input field', () => {
    const wrapper = mount(SearchBar)
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
  })

  it('triggers search on input and filters shows correctly', async () => {
    vi.useFakeTimers()

    const wrapper = mount(SearchBar)
    const input = wrapper.find('input')

    await input.setValue('Breaking Bad')
    expect(input.element.value).toBe('Breaking Bad')
    vi.advanceTimersByTime(500)
    expect(mockStore.searchShow).toHaveBeenCalledWith([
      {
        name: 'Breaking Bad',
        id: 0,
        url: '',
        type: '',
        language: '',
        genres: [],
        status: '',
        averageRuntime: null,
        premiered: null,
        ended: null,
        officialSite: null,
        schedule: {
          time: '',
          days: [],
        },
        rating: {
          average: null,
        },
        network: null,
        image: null,
        summary: '',
        updated: 0,
      },
    ])

    vi.useRealTimers()
  })

  it('should call searchShow with null if no shows match the query', async () => {
    vi.useFakeTimers()

    const wrapper = mount(SearchBar)
    const input = wrapper.find('input')

    await input.setValue('Nonexistent Show')
    vi.advanceTimersByTime(500)
    expect(mockStore.searchShow).toHaveBeenCalledWith(null)

    vi.useRealTimers()
  })
})
