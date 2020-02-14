import React, {useEffect, useState} from 'react';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Axios from "axios";

const AnnonceShow = ({match, history}) => {

    const {id = "new"} = match.params;
    const [show, setShow] = useState(false);
    const [annonceData, setAnnonceData] = useState();
    const [carouselSettings, setCarouselSettings] = useState({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 1500,
        pauseOnFocus: false,
    });

    const fetchAnnonce = async id => {
        try {
            const data = await Axios.get("https://127.0.0.1:8000/api/annonces/" + id);
            setAnnonceData(data.data);
            setShow(true);
        } catch (e) {
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


            <>
                <h2 className="h2 text-left

                span.mt-3L'annonceur :">{annonceData.titre}</h2>

                <div className="row">
                    <div className="col-6 m-0 p-0" >
                        <div className="card " style={{height: "70vh"}}>
                            <div className="card-body">
                                <h2 className="h2 card-title">Quelques images :</h2>
                                <Slider {...carouselSettings} >
                                    {annonceData.images.map((img, idx) => {
                                        return (
                                            <div className="d-flex justify-content-center" key={img.id}>
                                                <img style={{width: "100%"}} src={img.url} alt=""/>
                                            </div>
                                        )
                                    })}
                                </Slider>

                                <h2 className="h4 mt-5 font-italic">Description :</h2>
                                <p>{annonceData.description}</p>
                                <p className="mt-5 font-italic">Postée le : {annonceData.postedAt}</p>

                            </div>
                        </div>
                    </div>
                    <div className="col-6 m-0 p-0">
                        <div className="card" style={{height: "70vh"}}>
                            <div className="card-body">
                                <h2 className="h2">Informations supplémentaires :</h2>

                                <div className="mb-2">
                                    <span className="h4">L'annonceur : {annonceData.user.prenom} {annonceData.user.nom}</span> <br/>
                                </div>
                                <div className="mb2 mt-2">
                                    <span className="h4">Email : {annonceData.user.email}</span>
                                </div>
                                <div className="mb2 mt-2">
                                    <span className="h4">Tél : {annonceData.user.phone}</span>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>

            </>

            }

        </>

    );
};

export default AnnonceShow;