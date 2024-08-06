const InfoKey = 'USER_INFO'
const SearchHistory = 'SEARCH_HISTORY'

export const getUserInfo = () => {
  const defaultObj = { token: '', userId: '' }
  const userInfo = localStorage.getItem(InfoKey)
  return userInfo ? JSON.parse(userInfo) : defaultObj
}

export const setUserInfo = (info) => {
  localStorage.setItem(InfoKey, JSON.stringify(info))
}

export const removeUserInfo = () => {
  localStorage.removeitem(InfoKey)
}

// 搜索历史持久化

export const getSearchHistory = () => {
  const history = localStorage.getItem(SearchHistory)
  return history ? JSON.parse(history) : []
}

export const setSearchHistory = (history) => {
  localStorage.setItem(SearchHistory, JSON.stringify(history))
}
