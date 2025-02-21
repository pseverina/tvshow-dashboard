import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ShowDetails from '@/pages/DetailsPage/DetailsPage.vue'
import { useShowStore } from '@/store/showsStore'
import { useRoute, useRouter } from 'vue-router'

vi.mock('@/store/showsStore', () => {
  return {
    useShowStore: vi.fn(),
  }
})

vi.mock('vue-router', () => {
  return {
    useRoute: vi.fn(),
    useRouter: vi.fn(),
  }
})

describe('DetailsPage.vue', () => {
  let mockShowStore
  let mockRoute
  let mockRouter

  beforeEach(() => {
    mockShowStore = {
      allShows: [
        {
          id: 1,
          name: 'Breaking Bad',
          language: 'English',
          genres: ['Crime', 'Drama'],
          schedule: { time: '22:00', days: ['Monday', 'Tuesday'] },
          officialSite: 'https://www.officialsite.com',
          premiered: '2008-01-20',
          ended: '2013-09-29',
          image: { medium: 'image-url-medium', original: 'image-url-original' },
        },
      ],
      getShows: vi.fn(),
      setGenre: vi.fn(),
      shows: [],
      genres: [],
      loading: false,
    }

    mockRoute = { params: { id: '1' } }
    mockRouter = { push: vi.fn() }

    //@ts-ignore
    useShowStore.mockReturnValue(mockShowStore)
    //@ts-ignore
    useRoute.mockReturnValue(mockRoute)
    //@ts-ignore
    useRouter.mockReturnValue(mockRouter)
  })

  it('renders show details correctly', async () => {
    const wrapper = mount(ShowDetails)

    await wrapper.vm.$nextTick()

    const title = wrapper.find('.title')
    expect(title.text()).toBe('Breaking Bad')

    const detailsWrapper = wrapper.find('.details-wrapper')
    expect(detailsWrapper.exists()).toBe(true)

    const language = wrapper.find('.details-text-language')
    expect(language.text()).toContain('Language: English')

    const genre = wrapper.findAll('.details-text-genre')
    expect(genre.length).toBe(2)
    expect(genre[0].text()).toContain('Crime')
    expect(genre[1].text()).toContain('Drama')

    const showDates = wrapper.findAll('.details-text-dates span')
    expect(showDates.length).toBe(2)
    expect(showDates[0].text()).toBe('Monday,')
    expect(showDates[1].text()).toBe('Tuesday,')

    const showTime = wrapper.find('.details-text-time')
    expect(showTime.text()).toContain('Show time: 22:00')

    const backLink = wrapper.find('.back-link')
    expect(backLink.exists()).toBe(true)
    await backLink.trigger('click')

    expect(mockRouter.push).toHaveBeenCalledWith('/')
  })

  it('handles missing show data', async () => {
    mockShowStore.allShows = []
    const wrapper = mount(ShowDetails)

    await wrapper.vm.$nextTick()

    const detailsWrapper = wrapper.find('.details-wrapper')
    expect(detailsWrapper.exists()).toBe(false)

    const title = wrapper.find('.title')
    expect(title.exists()).toBe(false)
  })
})
