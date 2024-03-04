import React from 'react'

const InstaContext = React.createContext({
  searchText: '',
  isSearchButtonClicked: false,
  setLoading: false,
  isFailure: false,
  resetFailure: () => {},
  setFailure: () => {},
  setSearchButton: () => {},
  updateLoading: () => {},
  upDateSearchText: () => {},
  resetSearchButton: () => {},
  postsData: [],
  setPostsData: () => {},
  initiateSearchPostLikeApi: () => {},
})

export default InstaContext
