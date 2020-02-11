import React, {useContext} from 'react';
import {Redirect, Route} from "react-router-dom";
import AuthContext from "../Context/AuthContext";


const PrivateRoute = (props) => {

    const {isAuth} = useContext(AuthContext);

    return isAuth
        ? <Route path={props.path} component={props.component}/>
        : <Redirect to='/login'/>;
};

export default PrivateRoute;