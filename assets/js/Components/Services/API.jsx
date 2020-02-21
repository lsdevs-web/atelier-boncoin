import Axios from "axios";
import JWTDecode from 'jwt-decode';


const findAnnonces = () => {
    return Axios.get("https://upper-agency.fr/api/annonces")
        .then(response => response.data["hydra:member"])
};

const authentication = credentials => {
    return Axios.post("https://upper-agency.fr/api/login_check", credentials)
        .then(response => response.data.token)
        .then(token => {
            let t = token;
            window.localStorage.setItem("authToken", token);
            Axios.defaults.headers['Authorization'] = "Bearer " + token;
        });
};


const setup = () => {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const JWTData = JWTDecode(token);
        if (JWTData.exp * 1000 > new Date().getTime()) {
            Axios.defaults.headers['Authorization'] = "Bearer " + token;
            console.log("connexion etablie")
        } else {
            logout();
        }
    } else {
        logout();
    }
};

const isAuth = () => {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const JWTData = JWTDecode(token);
        return JWTData.exp * 1000 > new Date().getTime();
    } else {
        return false;
    }
};

const logout = () => {
    window.localStorage.removeItem("authToken");
    delete Axios.defaults.headers['Auhtorization'];
};


export default {
    findAnnonces,
    authentication,
    logout,
    setup,
    isAuth
};