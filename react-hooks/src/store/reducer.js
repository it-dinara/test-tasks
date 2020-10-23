import * as actionTypes from './actionTypes.js'

const initialState = {
	loading: true,
	fetchedCardsRes: [],
}

const fetchCardsStart = (state, action) => {
    return {
        ...state,
        loading: true
    }
}

const fetchCardsSuccess = (state, action) => {
	const fetchedCardsRes = [];
	for (let key in action.fetchedCards) {
		fetchedCardsRes.push({
			...action.fetchedCards[key],
			id: key
		});
	}
	return {
		...state,
		loading: false,
		fetchedCardsRes: fetchedCardsRes,
	}
}

const fetchCardsFail = (state, action) => {
    return {
        ...state,
		loading: false,
    }
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_CARDS_START: return fetchCardsStart(state, action);
		case actionTypes.FETCH_CARDS_SUCCESS: return fetchCardsSuccess(state, action);
		case actionTypes.FETCH_CARDS_FAIL: return fetchCardsFail(state, action);
		default: return state;
	}
}

export default reducer;