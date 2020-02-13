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
                    <ul className="mr-auto">
                            <NavLink className="btn btn-dark my-sm-0 nav-link" to="/annonces/new">Déposer une annonce</NavLink>
                    </ul>
                        {!isAuth &&
                        <>
                                <NavLink className="btn btn-dark mx-2 nav-link" to="/register">Inscription</NavLink>
                                <NavLink className="btn btn-dark mx-2 nav-link" to="/login">Connexion</NavLink>
                        </>
                        }
                        {isAuth &&
                            <NavLink onClick={handleLogout} className="btn btn-dark mx-2 nav-link" to="/" >Déconnexion</NavLink>}
                </div>
            </nav>
        </>
    );
};

export default NavBar;