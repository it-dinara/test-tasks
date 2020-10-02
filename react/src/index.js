import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import orderReducer from './store/reducer.js'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

const reducer = orderReducer;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));


const app = (
    <Provider store={store}>
        <App/>
    </Provider>
)

ReactDOM.render(app, document.getElementById("root"));