import * as actionTypes from './actionTypes';

const initialState = {
  loading: false,
  fetchedCards: [],
  error: null
}


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
        loading: false,
        fetchedCards: action.fetchedCards,
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