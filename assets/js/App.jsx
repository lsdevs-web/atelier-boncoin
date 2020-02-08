import React from 'react';
import ReactDOM from 'react-dom'
import "../scss/Dependencies.scss"
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Annonces from './Components/Annonces'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import NotFound from "./Components/NotFound";

const App = () => {

    return (
        <Router>

            <NavBar/>

            <main className="container pt-5">
                <Switch>

                    <Route exact path="/annonces" component={Annonces}/>
                    <Route exact path="/" component={Home}/>
                    <Route path="*" component={NotFound}/>

                </Switch>
            </main>


        </Router>

    );
};

const rootElement = document.querySelector("#root");
ReactDOM.render(<App/>, rootElement);

