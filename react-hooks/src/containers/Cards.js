import React, {useState, useEffect} from 'react'
import Spinner from '../components/UI/Spinner/Spinner'
import {connect} from 'react-redux'
import Card from '../components/Card/Card'
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler'
import axios from 'axios'
import {fetchCards} from '../store/action.js'
import './Cards.css'

const Cards = () => {

    const [value, setValue] = useState('')
    const [data, setData] = useState({cards: []})
    const [showText, setShowText] = useState(
        {
            '00': true,
            '01': false,
            '02': false
        })
    
    const [switchSortCards, setSwitchSortCards] = useState(false)
    const [filterCards, setFilterCards] = useState(false)

    const sortHandler = () => {

        if(data.length > 0) {

            if(switchSortCards) {
                data.sort((a, b) => {
                    return b.cardAccount - a.cardAccount
                })
            } else {
                data.sort((a, b) => {
                    return a.cardAccount - b.cardAccount
                })
            }   

            setSwitchSortCards(!switchSortCards)
            setFilterCards(data)

        }
    }

    useEffect(() => {
        const fetchData = async () => {
          const result = await axios(
            'https://cardholders-9f570.firebaseio.com//.json',
          );
          let arr = []
          const cards = Object.keys(result.data).map(card => {
              return result.data[card]
          })

          setData(cards);
        };
     
        fetchData();
      }, []);


    const switchShowContentHandler = (e, id) => {
        setShowText({ [id]: !showText[id] })
    }

    let cards = [];
        if(data.length > 0) {
            cards =  data.map((card, i) => {
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
            {cards}
        </div>
    )
}


export default (withErrorHandler(Cards, axios))