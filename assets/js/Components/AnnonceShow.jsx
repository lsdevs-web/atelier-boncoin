import React, {useEffect, useState} from 'react';
import Axios from "axios";

const AnnonceShow = ({match, history}) => {

    const {id = "new"} = match.params;
    const [show, setShow] = useState(false);
    const [annonceData, setAnnonceData] = useState();

    const fetchAnnonce = async id => {
        try {
            const data = await Axios.get("https://127.0.0.1:8000/api/annonces/" + id);
            setAnnonceData(data.data);
            setShow(true);
        } catch(e) {
            if (e.response.data["hydra:description"] === "Not Found") {
                history.replace("/annonces");
            }
        }
    };

    useEffect(() => {

        if (id !== "new") {
            fetchAnnonce(id)
        }

    }, [id]);

    return (
        <>
            {show &&

            <div>

                <h1>Annonce n° {id}</h1>

            </div>

            }

        </>

    );
};

export default AnnonceShow;