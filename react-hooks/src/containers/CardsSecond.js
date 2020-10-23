import React, {useState, useEffect, useReducer} from 'react'
import Spinner from '../components/UI/Spinner/Spinner'
import Card from '../components/Card/Card'
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler'
import axios from 'axios'
import {reducer} from '../store/reducerHook.js'
import './Cards.css'

const Cards = () => {
    const [state, dispatch] = useReducer(reducer, [])
    const [value, setValue] = useState('')
    const [showText, setShowText] = useState(
        {
            '00': true,
            '01': false,
            '02': false
        })
    
    const [switchSortCards, setSwitchSortCards] = useState(false)

    const sortHandler = () => {

        if(state.length > 0) {

            if(switchSortCards) {
                state.sort((a, b) => {
                    return b.cardAccount - a.cardAccount
                })
            } else {
                state.sort((a, b) => {
                    return a.cardAccount - b.cardAccount
                })
            }   

            setSwitchSortCards(!switchSortCards)
            // setFilterCards(data)

        }
    }

    useEffect(() => {
        axios
            .get('https://cardholders-9f570.firebaseio.com//.json')
            .then(response => {
                const cards = Object.keys(response.data).map(card => {
                    return response.data[card]
                })
                dispatch({
                    type: 'FETCH_CARDS_SUCCESS',
                    fetchedCards: cards
                })
            })
            .catch(error => {
                dispatch({
                    type: 'FETCH_CARDS_FAIL',
                    error: error.message
                })
            })
      }, []);


    const switchShowContentHandler = (e, id) => {
        setShowText({ [id]: !showText[id] })
    }

    
    let cards = <Spinner/>;
    console.log('state', state)
    console.log('state.fetchedCards', state.fetchedCards)
    if(state.fetchedCards) {
        cards =  state.fetchedCards.map((card, i) => {
        let flag = true;
        if(card.cardAccount.slice(-4).indexOf(value) > -1 && flag) {
            return(
                <Card
                    key={card.id}
                    cardAccount={card.cardAccount}
                    expirationDate={card.expirationDate}
                    bankName={card.name}
                    text={card.text}
                    amount={card.amount}
                    showText={showText[card.id]}
                    clicked={(event) => switchShowContentHandler(event, card.id)}
                />
            )
        }
    })
    }


    return (
        <div className='wrapper'>
            <div className='buttons'>
                <input 
                    type='text' 
                    value={value}
                    onChange={(event) => {setValue(event.target.value)}}
                    />
                <button onClick={sortHandler}>↑↓</button>
            </div>
            {state.error ? state.error : cards}
        </div>
    )
}


export default Cards