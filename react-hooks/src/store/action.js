import axios from 'axios'
import * as actionTypes from './actionTypes.js'


export const fetchCardsSuccess = (fetchedCards) => {
	return {
		type: actionTypes.FETCH_CARDS_SUCCESS,
		fetchedCards,
	}
}

export const fetchCardsFail = (error) => {
	return {
		type: actionTypes.FETCH_CARDS_FAIL,
		error
	}
}

export const fetchCardsStart = () => {
	return {
		type: actionTypes.FETCH_CARDS_START
	}
}

export const fetchCards = () => {
	return dispatch => {
		dispatch(fetchCardsStart());

        axios.get('https://cardholders-9f570.firebaseio.com//.json')
         
		.then(res => {
			dispatch(fetchCardsSuccess(res.data))
			console.log('res.data')
		})
		.catch(error => {
			dispatch(fetchCardsFail(error))
			console.log('ERROR')
		});
	}

}