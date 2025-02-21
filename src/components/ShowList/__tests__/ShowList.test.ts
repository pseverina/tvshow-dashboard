import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ShowList from '@/components/ShowList/ShowList.vue'
import { useRouter } from 'vue-router'
import type { Show } from '@/types/Show'
import movieImg from '@/assets/icons/movie-img.svg'

vi.mock('vue-router', () => ({
  useRouter: vi.fn(),
}))

describe('ShowList.vue', () => {
  let mockRouter: { push: vi.Mock }

  beforeEach(() => {
    mockRouter = {
      push: vi.fn(),
    }
    useRouter.mockReturnValue(mockRouter)
  })

  it('renders show list', () => {
    const shows: Show[] = [
      {
        id: 1,
        name: 'Breaking Bad',
        rating: { average: 9.5 },
        image: { original: 'image-url', medium: 'image-url' },
        summary: '',
        genres: [],
        network: null,
        schedule: { time: '', days: [] },
        premiered: '',
        type: '',
        language: '',
        status: '',
        officialSite: '',
        updated: 0,
        averageRuntime: null,
        ended: '',
        url: '',
      },
      {
        id: 2,
        name: 'Stranger Things',
        rating: { average: 8.7 },
        image: { original: 'image-url', medium: 'image-url' },
        summary: '',
        genres: [],
        network: null,
        schedule: { time: '', days: [] },
        premiered: '',
        type: '',
        language: '',
        status: '',
        officialSite: '',
        updated: 0,
        averageRuntime: null,
        ended: '',
        url: '',
      },
    ]

    const wrapper = mount(ShowList, {
      props: {
        showsInfo: shows,
      },
    })

    const showItems = wrapper.findAll('.list__card')
    expect(showItems.length).toBe(shows.length)
    expect(showItems[0].text()).toContain('Breaking Bad')
    expect(showItems[1].text()).toContain('Stranger Things')
  })

  it('calls router.push when a show is clicked', async () => {
    const shows: Show[] = [
      {
        id: 1,
        name: 'Breaking Bad',
        rating: { average: 9.5 },
        image: { original: 'image-url', medium: 'image-url' },
        summary: '',
        genres: [],
        network: null,
        schedule: { time: '', days: [] },
        premiered: '',
        type: '',
        language: '',
        status: '',
        officialSite: '',
        updated: 0,
        averageRuntime: null,
        ended: '',
        url: '',
      },
    ]

    const wrapper = mount(ShowList, {
      props: {
        showsInfo: shows,
      },
    })

    const showItem = wrapper.find('.list__card')
    await showItem.trigger('click')

    expect(mockRouter.push).toHaveBeenCalledWith('/1')
  })

  it('displays default image when no image is provided', () => {
    const shows: Show[] = [
      {
        id: 1,
        name: 'Breaking Bad',
        rating: { average: 9.5 },
        image: null,
        summary: '',
        genres: [],
        network: null,
        schedule: { time: '', days: [] },
        premiered: '',
        type: '',
        language: '',
        status: '',
        officialSite: '',
        updated: 0,
        averageRuntime: null,
        ended: '',
        url: '',
      },
    ]

    const wrapper = mount(ShowList, {
      props: {
        showsInfo: shows,
      },
    })

    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe(movieImg)
  })

  it('shows the correct show name and rating', () => {
    const shows: Show[] = [
      {
        id: 1,
        name: 'Breaking Bad',
        rating: { average: 9.5 },
        image: { original: 'image-url', medium: 'image-url' },
        summary: '',
        genres: [],
        network: null,
        schedule: { time: '', days: [] },
        premiered: '',
        type: '',
        language: '',
        status: '',
        officialSite: '',
        updated: 0,
        averageRuntime: null,
        ended: '',
        url: '',
      },
    ]

    const wrapper = mount(ShowList, {
      props: {
        showsInfo: shows,
      },
    })

    const header = wrapper.find('.list__header')
    const rating = wrapper.find('.list__rating')

    expect(header.text()).toBe('"Breaking Bad"')
    expect(rating.text()).toBe('9.5')
  })
})
