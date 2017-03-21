const defaultState = {
  isFetching: false,
  hasResults: false,
  ownLikes: 0,
  totalItems: 0,
  username: null,
  profilePicture: null,
  error: false
}

const media = (state = defaultState, action) => {
    switch (action.type) {
        case 'REQUEST_MEDIA':
          return { ...state,
            isFetching: true
          }
        case 'RECEIVE_MEDIA':
          return { ...state,
            isFetching: false,
            hasResults: true,
            ownLikes: action.ownLikes,
            totalItems: action.totalItems,
            username: action.username,
            profilePicture: action.profilePicture,
          }
        case 'RESET_RESULTS':
          return { ...state,
            hasResults: false,
            username: null,
            profilePicture: null,
            error: false,
            ownLikes: 0,
            totalItems: 0
          }
        case 'HANDLE_ERROR':
          return { ...state,
            isFetching: false,
            hasResults: false,
            username: null,
            profilePicture: null,
            ownLikes: 0,
            totalItems: 0,
            error: true
          }
        default:
            return state
    }
}

export default media