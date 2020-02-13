import React, {useEffect} from 'react';
import Axios from "axios";

const AnnonceShow = ({match}) => {

    const {id = "new"} = match.params;

    const fetchAnnonce = async id => {
        try {
            const data = await Axios.get("https://127.0.0.1:8000/api/annonces/" + id);
        } catch(e) {
            console.log(e.response)
        }
    };

    useEffect(() => {

        if (id !== "new") {
            fetchAnnonce(id)
        }

    }, [id]);

    return (
        <div>

            <h1>Annonce n° {id}</h1>

        </div>
    );
};

export default AnnonceShow;