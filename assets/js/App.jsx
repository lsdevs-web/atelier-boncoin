import React from 'react';
import ReactDOM from 'react-dom'
import Home from "./Components/Home";
import Annonces from './Components/Annonces'
import {HashRouter, Route, Switch} from "react-router-dom";

const App = () => {

    return (
        <HashRouter>

            <Switch>

                <Route exact path="/" component={Home}/>
                <Route exact path="/annonces" component={Annonces}/>

            </Switch>

        </HashRouter>

    );
};

const rootElement = document.querySelector("#root");
ReactDOM.render(<App/>, rootElement);

