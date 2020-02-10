import React, {useState} from 'react';
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "../scss/Dependencies.scss"
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Annonces from './Components/Annonces'
import NotFound from "./Components/NotFound";
import Login from "./Components/Login";
import API from "./Components/Services/API";

API.setup();

const App = () => {

    const [isAuth, setIsAuth] = useState(API.isAuth());


    return (
        <Router>

            <NavBar
            isAuth={isAuth}
            onLogout={setIsAuth}
            />

            <main className="container pt-5">
                <Switch>

                    <Route exact path="/login" render={(props) => <Login isAuth={isAuth} onLogin={setIsAuth}/>}/>
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

