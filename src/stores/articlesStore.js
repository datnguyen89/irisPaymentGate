import request from '../requests/request'
import { setRecoil } from 'recoil-nexus'
import { articleDetailState, articlesListState } from '../recoil/articlesState'

const articlesStore = {
  getArticlesList: () => {
    return new Promise((resolve, reject) => {
      const url = '/articles'
      request.get(url, null, false, false)
        .then(res => {
          setRecoil(articlesListState, res)
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getArticleDetail: (params) => {
    return new Promise((resolve, reject) => {
      const url = `/articles/${params.articleId}`
      request.get(url, null, false, false)
        .then(res => {
          setRecoil(articleDetailState, res)
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
}
export default articlesStore