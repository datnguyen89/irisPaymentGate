import { atom, selector } from 'recoil'

export const filterStatusArticlesState = atom({
  key: 'filterStatusArticlesState',
  default: null,
})
export const articlesListState = atom({
  key: 'articlesListState',
  default: [],
})
export const articlesListFilteredSelector = selector({
  key: 'articlesListFilteredSelector',
  get: ({ get }) => {
    const filterStatus = get(filterStatusArticlesState)
    const articlesList = get(articlesListState)
    switch (filterStatus) {
      case true:
        return articlesList.filter(item => item.active)
      case false:
        return articlesList.filter(item => !item.active)
      default:
        return articlesList
    }
  },
})
export const articleDetailState = atom({
  key: 'articleDetailState',
  default: null,
})