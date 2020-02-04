import React from 'react';
import ReactDOM from 'react-dom'
import Home from "./Components/Home";
import {HashRouter, Route, Switch} from "react-router-dom";

const App = () => {
    return (
        <HashRouter>

                <Switch>

                    <Route path="/" component={Home}/>

                </Switch>

        </HashRouter>

    );
};

const rootElement = document.querySelector("#root");
ReactDOM.render(<App/>, rootElement);

