import React, {useEffect, useState} from 'react';
import "../../scss/Annonces.scss"
import Axios from "axios";
import Pagination from "./Services/Pagination";

const Annonces = () => {

    const [annoncesData, setAnnoncesData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchData, setSearch] = useState({
        categorie: "",
        region: "",
        search: ""
    });

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


    const filteredAnnonces = annoncesData.filter(annonce =>
        (
            annonce.titre.toLowerCase().includes(searchData.search.toLowerCase())
            || annonce.user.prenom.toLowerCase().includes(searchData.search.toLowerCase())
            || annonce.user.nom.toLowerCase().includes(searchData.search.toLowerCase())
        )

        && annonce.categorie.toLowerCase().includes(searchData.categorie.toLowerCase())
        && annonce.region.toLowerCase().includes(searchData.region.toLowerCase())
    );

    const paginatedAnnonces = Pagination.getData(filteredAnnonces, currentPage, itemsPerPage);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch({...searchData, search: value});
        setCurrentPage(1);
    };

    const handleSelect = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (value === "Tous") {
            setSearch({...searchData, [name]: ""})
        } else {
            setSearch({...searchData, [name]: value});
        }

        setCurrentPage(1);

    };


    return (
        <>

            <div className="row">
                <div className="col d-flex justify-content-start align-items-center text-center">
                    <h1 className="mb-5" style={{fontSize: "50px"}}>Bienvenue sur nos annonces</h1>
                </div>
            </div>

            <div className="form-group d-flex flex-row">
                <select onChange={handleSelect} name="categorie" className="custom-select w-25 mx-1" id=""
                        defaultValue="Catégories">
                    <option disabled hidden>Catégories</option>
                    <option>Tous</option>
                    <option>Outillage</option>
                    <option>Technologie</option>
                    <option>Automobile</option>
                </select>
                <select onChange={handleSelect} name="region" className="custom-select w-25 mx-1" id=""
                        defaultValue="Région">
                    <option disabled hidden>Région</option>
                    <option>Tous</option>
                    <option>Ile-de-France</option>
                    <option>Midy-Pyrénnées</option>
                    <option>Alsace</option>
                </select>
                <input type="text" className="form-control mx-2" onChange={handleSearch} value={searchData.search}
                       placeholder="Chercher une annonce ..."/>
            </div>
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

            {itemsPerPage < filteredAnnonces.length &&

            <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                Length={filteredAnnonces.length}
                onPageChanged={handlePageChange}/>
            }

        </>
    );
};

export default Annonces;
