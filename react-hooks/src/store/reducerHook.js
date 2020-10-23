const initialState = {
  loading: false,
  fetchedCards: [],
  error: null
}

// actions
const FETCH_CARDS_FAIL = 'FETCH_CARDS_FAIL'
const FETCH_CARDS_START = 'FECTH_CARDS_START'
const FETCH_CARDS_SUCCESS = 'FETCH_CARDS_SUCCESS'

// actions creators

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_CARDS_START':
      return {
        ...state,
        loading: true,
      }
    case 'FETCH_CARDS_SUCCESS': 
      return {
        ...state,
        fetchedCards: action.fetchedCards
      }
    case 'FETCH_CARDS_FAIL':
      return {
        ...state,
        loading: false,
        error: action.error
      }

    default:
      return state
  }
}