import React, { useState, useEffect } from "react";
import Field from "./Forms/Field";
import Axios from "axios";

const Register = props => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    phone: "",
    prenom: "",
    nom: ""
  });

  const [error, setError] = useState({
    email: "",
    password: "",
    phone: "",
    prenom: "",
    nom: ""
  });

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = await Axios.post(
        "https://127.0.0.1:8000/api/users",
        credentials
      );
      setError({});
      props.history.replace("/login");
    } catch (e) {
      console.log(e.response);
      if (e.response.data.violations) {
        const apiErrors = {};
        e.response.data.violations.forEach(violation => {
          apiErrors[violation.propertyPath] = violation.message;
        });
        setError(apiErrors);
      }
    }
  };

  return (
    <>
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-6 mt-5">
          <div className="card">
            <div className="card-body">
              <h2 style={{ fontSize: "50px" }} className="card-title">
                Inscription
              </h2>
              <form onSubmit={handleSubmit}>
                <Field
                  name="email"
                  label="Email"
                  onChange={handleChange}
                  value={credentials.email}
                  type="email"
                  error={error.email}
                  placeholder="Votre email"
                />
                <Field
                  name="prenom"
                  label="Prénom"
                  onChange={handleChange}
                  value={credentials.prenom}
                  type="text"
                  error={error.prenom}
                  placeholder="Votre prénom"
                />
                <Field
                  name="nom"
                  label="Nom"
                  onChange={handleChange}
                  value={credentials.nom}
                  type="text"
                  error={error.nom}
                  placeholder="Votre nom"
                />
                <Field
                  name="phone"
                  label="Tel"
                  onChange={handleChange}
                  value={credentials.phone}
                  type="text"
                  error={error.phone}
                  placeholder="Votre numéro de téléphone"
                />
                <Field
                  name="password"
                  type="password"
                  onChange={handleChange}
                  value={credentials.password}
                  placeholder="Votre mot de passe"
                  error={error.password}
                  label="Mot de passe"
                />
                <button type="submit" className="btn btn-primary">
                  Je m'inscris
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
