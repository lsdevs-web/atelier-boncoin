import React, {useState, useContext} from 'react';
import API from "./Services/API";
import AuthContext from "./Context/AuthContext";

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
                            <div className="form-group">
                                <label htmlFor="_username" style={{fontSize: "20px"}} className="my-2">Email</label>
                                <input onChange={handleChange} value={credentials.username} type="email"
                                       className={"form-control " + (error && "is-invalid")} placeholder="Votre email"
                                       name="username"

                                />
                                {error && <p className="invalid-feedback">{error}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="_password" style={{fontSize: "20px"}} className="my-2">Mot de
                                    passe</label>
                                <input onChange={handleChange} value={credentials.password} type="password"
                                       className="form-control" placeholder="Votre mot de passe" name="password"/>
                            </div>
                            <button type="submit" className="btn btn-primary">Connexion</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;