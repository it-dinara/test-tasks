import * as actionTypes from './actionTypes';

const initialState = {
  loading: false,
  fetchedCards: [],
  error: null
}

// actions creators

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_CARDS_START:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.FETCH_CARDS_SUCCESS: 
      return {
        ...state,
        fetchedCards: action.fetchedCards
      }
    case actionTypes.FETCH_CARDS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      }

    default:
      return state
  }
}