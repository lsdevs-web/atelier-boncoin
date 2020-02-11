import React, {useState} from 'react';
import Field from "./Forms/Field";
import Select from "./Forms/Select";

const NewAnnonce = () => {

    const [annonce, setAnnonce] = useState({
        titre: "",
        intro: "",
        categorie: "",
        region: "",
        description: "",
        coverImage: "",
        images: [],
        prix: null
    });

    const [error, setError] = useState({
        titre: "",
        intro: "",
        categorie: "",
        region: "",
        description: "",
        coverImage: "",
        images: [],
        prix: null
    });


    return (
        <>
            <h1 className="h1">Déposer votre annonce</h1>
            <form className="" action="">

                <Field
                    label="Titre de l'annonce"
                    value={annonce.titre}
                    placeholder="Le titre de votre annonce"
                    name="titre"
                    error={error.titre}
                />
                <Field
                    label="Introduction de l'annonce"
                    value={annonce.intro}
                    placeholder="L'introduction de votre annonce"
                    name="intro"
                    error={error.intro}
                />

                <div className="d-flex flex-row mt-4">
                    <Select style={{width: "33%", margin: "0 4px 0 4px"}} name="categorie" title="Catégorie"
                            defValue="Catégorie">
                        <option>Outillage</option>
                        <option>Technologie</option>
                        <option>Automobile</option>
                    </Select>
                    <Select style={{width: "33%", margin: "0 4px 0 4px"}} name="region" title="Région"
                            defValue="Région">
                        <option>Ile-de-France</option>
                        <option>Midy-Pyrénnées</option>
                        <option>Alsace</option>
                    </Select>
                    <input type="number" className="form-control" name="prix" placeholder="Votre prix"
                           style={{width: "33%", margin: "0 4px 0 4px"}}/> <span
                    style={{marginTop: "10px", fontSize: "20px", fontWeight: "bold"}}>€</span>
                </div>


            </form>
        </>
    );
};

export default NewAnnonce;