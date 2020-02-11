import React, {useContext, useState} from 'react';
import API from "./Services/API";
import AuthContext from "./Context/AuthContext";
import Field from "./Forms/Field";

const Login = (props) => {

    const {setIsAuth} = useContext(AuthContext);

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        setCredentials({...credentials, [name]: value})
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await API.authentication(credentials);
            setError("");
            setIsAuth(true);
            props.history.replace("/");
        } catch (e) {
            console.log(e.response);
            setError("Mauvais identifiant ou mot de passe")
        }
    };


    return (
        <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-6 mt-5">
                <div className="card">
                    <div className="card-body">
                        <h2 style={{fontSize: "50px"}} className="card-title">Connexion au site</h2>
                        <form onSubmit={handleSubmit}>
                            <Field
                                name="username"
                                label="Email"
                                onChange={handleChange}
                                value={credentials.username}
                                type="email"
                                error={error}
                                placeholder="Votre email"
                            />
                            <Field
                                name="password"
                                type="password"
                                onChange={handleChange}
                                value={credentials.password}
                                placeholder="Votre mot de passe"
                                error={error}
                                label="Mot de passe"
                            />
                            <button type="submit" className="btn btn-primary">Connexion</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;