import React, { Component } from "react";
import 'normalize.css'
import './App.css'
import Card from './containers/Cards.js'


class App extends Component {
    render() {
        return (
            <div>
                <Card/>
            </div>
        );
    }
}

export default App;