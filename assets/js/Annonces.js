import '../scss/Annonces.scss'
import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {getData} from "./Services/getJsonData";

const Annonces = () => {

    const [annoncesData, setAnnoncesData] = useState();

    useEffect(() => {

        const element = document.getElementById('annonces-root');
        setAnnoncesData(getData("test", element));

    }, []);

    if (annoncesData) {
        console.log(annoncesData);
    }

    return (
        <div className="jumbotron">
        </div>
    );
};

ReactDOM.render(<Annonces />, document.getElementById('annonces-root'));