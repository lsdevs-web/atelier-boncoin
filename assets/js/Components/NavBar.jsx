import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import API from "./Services/API";
import AuthContext from "./Context/AuthContext";

const NavBar = (props) => {

    const {isAuth, setIsAuth} = useContext(AuthContext);

    const handleLogout = () => {
        API.logout();
        setIsAuth(false);
        props.history.push("/login");
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <NavLink to="/" className="navbar-brand">Leboncoin</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                        aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                   <span className="navbar-toggler-icon">

                   </span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav mr-auto">
                        <li className="btn btn-dark ml-4 btn-sm my-2 my-sm-0">
                            <NavLink className="nav-link" to="/annonces/new">Déposer une annonce</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        {!isAuth &&
                        <>
                            <button className="btn btn-dark btn-sm mx-2">
                                <NavLink className="nav-link" to="/register">Inscription</NavLink>
                            </button>
                            <li className="btn btn-dark btn-sm mx-2">
                                <NavLink className="nav-link" to="/login">Connexion</NavLink>
                            </li>
                        </>
                        }
                        {isAuth &&
                        <button onClick={handleLogout} className="btn btn-dark btn-sm mx-2">
                            <NavLink className="nav-link" to="/">Déconnexion</NavLink>
                        </button>}

                    </ul>
                </div>
            </nav>
        </>
    );
};

export default NavBar;