import { mount } from '@vue/test-utils'
import { describe, it, vi, expect } from 'vitest'
import GenresTabs from '@/components/GenresTabs/GenresTabs.vue'
import { useShowStore } from '@/store/showsStore'

vi.mock('@/store/showsStore', () => ({
  useShowStore: () => ({
    selectedGenre: 'Drama',
  }),
}))

describe('GenresTabs', () => {
  it('renders genres correctly', () => {
    const genres = ['Drama', 'Action', 'Comedy']

    const wrapper = mount(GenresTabs, {
      props: {
        genres,
      },
    })

    genres.forEach((genre) => {
      expect(wrapper.text()).toContain(genre)
    })
  })

  it('applies the correct class when a genre is selected', () => {
    const genres = ['Drama', 'Action', 'Comedy']

    const wrapper = mount(GenresTabs, {
      props: {
        genres,
      },
    })

    const selectedTab = wrapper.find('.tab--selected')
    expect(selectedTab.text()).toBe('Drama')
  })

  it('emits select-genre event when a tab is clicked', async () => {
    const genres = ['Drama', 'Action', 'Comedy']

    const wrapper = mount(GenresTabs, {
      props: {
        genres,
      },
    })

    await wrapper.findAll('a').at(1)?.trigger('click')

    const emitted = wrapper.emitted('select-genre')
    expect(emitted).toBeTruthy()
    expect(emitted![0]).toEqual(['Action'])
  })
})
