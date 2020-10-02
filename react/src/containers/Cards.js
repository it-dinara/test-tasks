import React, {Component} from 'react'
import Spinner from '../components/UI/Spinner/Spinner'
import {connect} from 'react-redux'
import Card from '../components/Card/Card'
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler'
import axios from 'axios'
import {fetchCards} from '../store/action.js'
import './Cards.css'

class Cards extends Component {
   
    state = {
        showText: {
            'id-0': true,
            'id-1': false,
            'id-2': false
        },
        value: '',
        switchSortCards: false,
        filterCards: false
    }

    changeHandler = (event) => {
        console.log('event', event.target.value)
        this.setState({value: event.target.value})
    }

    sortHandler = () => {

        let cards =[...this.props.cards];

        if(this.state.switchSortCards) {
            cards.sort((a, b) => {
                return b.cardAccount - a.cardAccount
            })
        } else {
            cards.sort((a, b) => {
                return a.cardAccount - b.cardAccount
            })
        }   

        this.setState((prevState) => {
            return {
                switchSortCards: !prevState.switchSortCards,
                filterCards: cards
            }
        })

    }

    switchShowContentHandler = (e, id) => {
        const cards = this.state.showText
        let element = !cards[id]
        cards[id] = element
        this.setState({
                showText: cards
            }
        )
    }

    componentDidMount() {
        this.props.onFetchCards
    }

    render() {
        let cardPremier = this.state.filterCards
        if(!this.state.filterCards) {
            cardPremier = this.props.cards
        }
        let cards = <Spinner/>

        if (!this.props.loading) {
            cards = cardPremier.map((card, i) => {
                let flag = true;
                if(true) {
                    if(card.cardAccount.slice(-4).indexOf(this.state.value) > -1 && flag) {
                        return (
                                <Card
                                    key={card.id}
                                    cardAccount={card.cardAccount}
                                    expirationDate={card.expirationDate}
                                    bankName={card.name}
                                    text={card.text}
                                    amount={card.amount}
                                    showText={this.state.showText[card.id]}
                                    clicked={(event) => this.switchShowContentHandler(event, card.id)}
                                />
                            
                        )
                    }
                }
            })
        }
        return (
            <div className='wrapper'>
                <div className='buttons'>
                    <input 
                        type='text' 
                        value={this.state.value}
                        onChange={(event) => this.changeHandler(event)}
                        />
                    <button onClick={this.sortHandler}>↑↓</button>
                </div>
                {cards}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.loading,
        cards: state.fetchedCardsRes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchCards: dispatch(fetchCards())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Cards, axios))