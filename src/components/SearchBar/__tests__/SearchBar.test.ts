import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useShowStore } from '@/store/showsStore'
import SearchBar from '@/components/SearchBar/SearchBar.vue'
import type { Show } from '@/types/Show'
import { showsMock } from '@/utils/showsMock'

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
      allShows: showsMock,
      searchShow: vi.fn(),
    }

    // @ts-ignore
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
        id: 1,
        name: 'Breaking Bad',
        rating: { average: 9.5 },
        summary: '',
        network: null,
        type: '',
        language: 'English',
        status: '',
        updated: 0,
        averageRuntime: null,
        url: '',
        genres: ['Crime', 'Drama'],
        schedule: { time: '22:00', days: ['Monday', 'Tuesday'] },
        officialSite: 'https://www.officialsite.com',
        premiered: '2008-01-20',
        ended: '2013-09-29',
        image: { medium: 'image-url-medium', original: 'image-url-original' },
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
