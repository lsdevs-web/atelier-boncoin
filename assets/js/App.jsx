import React, {useState} from 'react';
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Switch, withRouter} from "react-router-dom";
import "../scss/Dependencies.scss"
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Annonces from './Components/Annonces'
import NotFound from "./Components/NotFound";
import Login from "./Components/Login";
import API from "./Components/Services/API";
import AuthContext from "./Components/Context/AuthContext";
import NewAnnonce from "./Components/NewAnnonce";
import PrivateRoute from "./Components/Services/PrivateRoute";

API.setup();

const App = () => {

    const [isAuth, setIsAuth] = useState(API.isAuth());

    const NavBarWithRouter = withRouter(NavBar);

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth
        }}>

            <Router>

                <NavBarWithRouter/>

                <main className="container pt-5">
                    <Switch>

                        <Route exact path="/login" component={Login}/>
                        <PrivateRoute exact path="/annonces/:id" component={NewAnnonce}/>
                        <Route exact path="/annonces" component={Annonces}/>
                        <Route exact path="/" component={Home}/>
                        <Route path="*" component={NotFound}/>

                    </Switch>
                </main>


            </Router>
        </AuthContext.Provider>


    );
};

const rootElement = document.querySelector("#root");
ReactDOM.render(<App/>, rootElement);

