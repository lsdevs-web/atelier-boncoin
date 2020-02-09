import React, {useEffect, useState} from 'react';
import "../../scss/Annonces.scss"
import Axios from "axios";
import Pagination from "./Services/Pagination";

const Annonces = () => {

    const [annoncesData, setAnnoncesData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        Axios.get("https://127.0.0.1:8000/api/annonces")
            .then(response => response.data["hydra:member"])
            .then(data => setAnnoncesData(data))
            .catch(e => console.log(e.response));
    }, []);


    const itemsPerPage = 9;
    const handlePageChange = page => {
        setCurrentPage(page)
    };

    const paginatedAnnonces = Pagination.getData(annoncesData, currentPage, itemsPerPage);


    return (
        <>

            <div className="row">
                {paginatedAnnonces.map(annonce => (
                    <div key={annonce.id} className="col-4">
                        <div className="card mb-3">
                            <h3 className="card-header"
                                style={{minHeight: "70px", lineHeight: "1.4"}}>{annonce.titre}</h3>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">{annonce.user.prenom} {annonce.user.nom}</li>
                            </ul>
                            <img src={annonce.coverImage} alt=""/>
                            <div className="card-body">
                                <p className="card-text">{annonce.intro}</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">{annonce.region}</li>
                                <li className="list-group-item">{annonce.categorie}</li>
                            </ul>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">{annonce.prix} €</li>
                            </ul>
                            <div className="card-footer text-muted">
                                <p>Postée le {annonce.postedAt}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} Length={annoncesData.length}
                        onPageChanged={handlePageChange}/>

        </>
    );
};

export default Annonces;
