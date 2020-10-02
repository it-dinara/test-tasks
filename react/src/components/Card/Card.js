import React from 'react'
import './Card.css'
import {spaceDigits, cardSpaceDigits} from '../../helpers/spaceDigits.js'

const Card = (props) => {
    return (
      <div className='container'>
        <div className='header' onClick={props.clicked}>

          <div className='account' >

            <p className='bankName'>
              {props.bankName}
            </p>
            <p className='cardAccount'>
              {cardSpaceDigits(props.cardAccount)}
            </p>
            <button 
              className={props.showText ? 'contentBtn open' : 'contentBtn close'}
              >
            </button>

          </div>
          <p className='expirationDate'>
            до {props.expirationDate}
          </p>
          <p className='amount'>
            {spaceDigits(props.amount)}
          </p>
        </div> 
        <p className={props.showText ? 'content show' : 'content collapse'}
        dangerouslySetInnerHTML={{__html:  props.showText ? props.text : null}}>
        </p>
      </div>
    )
}

export default Card