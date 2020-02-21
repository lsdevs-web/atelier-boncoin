import React, {useState} from 'react';
import Field from "./Forms/Field";
import Select from "./Forms/Select";
import ImgSubForm from "./Forms/ImgSubForm";
import Axios from "axios";

const NewAnnonce = ({history}) => {

    const [imgNumber, setImgNumber] = useState(0);

    const [annonce, setAnnonce] = useState({
        titre: "",
        intro: "",
        categorie: "",
        region: "",
        description: "",
        coverImage: "",
        images: [{url: "", caption: ""}],
        prix: null
    });

    const [error, setError] = useState({
        titre: "",
        intro: "",
        categorie: "",
        region: "",
        description: "",
        coverImage: "",
        "images[0].url": "",
        "images[0].caption": "",
        prix: null
    });

    const handleImage = (e) => {
        setImgNumber(imgNumber + 1);
        setAnnonce({...annonce}, annonce.images.push({url: "", caption: ""}));
        const timeoutID = setTimeout(() => {
            window.scrollTo(0, document.body.scrollHeight);
            clearTimeout(timeoutID)
        }, 100);
    };

    const handleDelete = (num) => {
        if (imgNumber > 0) {
            setAnnonce({...annonce}, annonce.images.splice(annonce.images.indexOf(num, 1)));
            setImgNumber(imgNumber - 1);
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await Axios.post("https://upper-agency.fr/atelier-boncoin/api/annonces", annonce);
            history.replace(`/annonces/${response.data.id}`);


        } catch (e) {


            if (e.response.data.violations) {
                const apiErrors = {};
                e.response.data.violations.forEach((violation) => {
                    apiErrors[violation.propertyPath] = violation.message
                });
                setError(apiErrors);
            }

        }
    };

    const handleCaption = (e, id) => {
        const value = e.target.value;

        setAnnonce({...annonce}, annonce.images[id].caption = value)
    };
    const handleUrl = (e, id) => {
        const value = e.target.value;

        setAnnonce({...annonce}, annonce.images[id].url = value)
    };


    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setAnnonce({...annonce, [name]: value})
    };


    return (
        <>
            <h1 className="h3">Déposer votre annonce</h1>
            <form onSubmit={handleSubmit} action="">

                <div className="card">
                    <div className="card-body">
                        <Field label="Titre de l'annonce" value={annonce.titre}
                               onChange={handleChange}
                               placeholder="Le titre de votre annonce" name="titre"
                               error={error.titre}
                        />
                        <Field label="Introduction de l'annonce" value={annonce.intro}
                               placeholder="L'introduction de votre annonce" name="intro"
                               onChange={handleChange}
                               error={error.intro}
                        />

                        <div className="d-flex flex-row mt-4 mb-3">
                            <div className="select-container" style={{width: "33%", margin: "0 4px 0 4px"}}>
                                <Select name="categorie" title="Catégorie"
                                        Handle={handleChange} defValue="Catégorie" error={error.categorie}>
                                    <option>Outillage</option>
                                    <option>Technologie</option>
                                    <option>Automobile</option>
                                </Select>
                            </div>
                            <div className="select-container" style={{width: "33%", margin: "0 4px 0 4px"}}>
                                <Select name="region" title="Région"
                                        Handle={handleChange} defValue="Région" error={error.region}>
                                    <option>Ile-de-France</option>
                                    <option>Midy-Pyrénnées</option>
                                    <option>Alsace</option>
                                </Select>
                            </div>

                            <div className="input-container" style={{width: "33%", margin: "0 4px 0 4px"}}>
                                <div className="input-row d-flex flex-row">
                                    <input type="number" className={"form-control " + (error.prix && "is-invalid")}
                                           name="prix"
                                           placeholder="Votre prix"
                                           onChange={handleChange}
                                    />
                                    <span style={{
                                        marginTop: "10px",
                                        fontSize: "20px",
                                        fontWeight: "bold",
                                        marginLeft: "5px"
                                    }}>€</span>
                                </div>
                                {error.prix && <p className="invalid-feedback">{error.prix}</p>}

                            </div>

                        </div>

                        <Field
                            label="Url de l'image de couverture" value={annonce.coverImage}
                            onChange={handleChange}
                            placeholder="L'url de l'image de couverture de votre annonce" name="coverImage"
                            error={error.coverImage}
                        />
                        <div className="form-group">

                            <label className="my-2" style={{fontSize: "20px"}} htmlFor="description">Description de
                                votre
                                annonce</label>
                            <textarea style={{maxHeight: "200px"}} placeholder="Décrivez votre annonce"
                                      className={"form-control " + (error.description && "is-invalid")}
                                      onChange={handleChange}
                                      name="description" id="" cols="30" rows="10"/>
                            {error.description && <p className="invalid-feedback">{error.description}</p>}
                        </div>
                    </div>
                </div>


                {annonce.images.map((image, id) => {


                    return <ImgSubForm key={id} url={annonce.images[id].url} handle={handleImage}
                                       errorUrl={error[`images[${id}].url`]}
                                       errorCaption={error[`images[${id}].caption`]}
                                       caption={annonce.images[id].caption} num={id}
                                       changeCaption={() => handleCaption(event, id)}
                                       changeUrl={() => handleUrl(event, id)}
                                       deleteImg={handleDelete} imgN={imgNumber}/>

                })}


                <div className="row d-flex justify-content-end">

                    <button className="btn btn-dark btn-lg mb-3 mr-3">Créer l'annonce</button>
                </div>


            </form>
        </>
    );
};

export default NewAnnonce;