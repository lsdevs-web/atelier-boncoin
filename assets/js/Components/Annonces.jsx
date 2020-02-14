import React, {useEffect, useState} from 'react';
import "../../scss/Annonces.scss"
import Pagination from "./Services/Pagination";
import API from "./Services/API";
import Select from "./Forms/Select";

const Annonces = ({history}) => {

    const [annoncesData, setAnnoncesData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchData, setSearch] = useState({
        categorie: "",
        region: "",
        search: ""
    });

    // AJAX GET ANNONCES
    const fetchAnnonce = async () => {
        try {
            const data = await API.findAnnonces();
            setAnnoncesData(data)
        } catch (e) {
            console.log(e.response);
        }

    };

    // ComponentDidMount REQUEST
    useEffect(() => {
        fetchAnnonce();
    }, []);


    // Gestion de la recherche
    const itemsPerPage = 9;

    // Filtrage des annonces pour la recherche
    const filteredAnnonces = annoncesData.filter(annonce =>
        (
            annonce.titre.toLowerCase().includes(searchData.search.toLowerCase())
            || annonce.user.prenom.toLowerCase().includes(searchData.search.toLowerCase())
            || annonce.user.nom.toLowerCase().includes(searchData.search.toLowerCase())
        )

        && annonce.categorie.toLowerCase().includes(searchData.categorie.toLowerCase())
        && annonce.region.toLowerCase().includes(searchData.region.toLowerCase())
    );

    // Pagination des Annonces
    const paginatedAnnonces = Pagination.getData(filteredAnnonces, currentPage, itemsPerPage);

    const handlePageChange = page => {
        setCurrentPage(page)
    };

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

    const handleClick = (id) => {
        history.push(`/annonces/${id}`);
    };


    return (
        <>

            <div className="row">
                <div className="col d-flex justify-content-start align-items-center text-center">
                    <h1 className="h3 mb-2">Bienvenue sur nos annonces</h1>
                </div>
            </div>

            <div className="form-group d-flex flex-row">
                <Select Handle={handleSelect} name="categorie" defValue="Catégories" title="Catégories">
                    <option>Tous</option>
                    <option>Outillage</option>
                    <option>Technologie</option>
                    <option>Automobile</option>
                </Select>
                <Select Handle={handleSelect} name="region" defValue="Régions" title="Régions">
                    <option>Tous</option>
                    <option>Ile-de-France</option>
                    <option>Midy-Pyrénnées</option>
                    <option>Alsace</option>
                </Select>
                <input type="text" className="form-control mx-2" onChange={handleSearch} value={searchData.search}
                       placeholder="Chercher une annonce ..."/>
            </div>
            <div className="row">
                {paginatedAnnonces.map(annonce => (
                    <div key={annonce.id} className="col-4">
                        <div style={{cursor: "pointer"}} className="card mb-3" onClick={() => handleClick(annonce.id)}>
                            <h3 className="card-header"
                                style={{minHeight: "70px", lineHeight: "1.4"}}>{annonce.titre}</h3>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">{annonce.user.prenom} {annonce.user.nom}</li>
                            </ul>
                            <img src={annonce.coverImage} style={{maxHeight: "300px"}} alt=""/>
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
