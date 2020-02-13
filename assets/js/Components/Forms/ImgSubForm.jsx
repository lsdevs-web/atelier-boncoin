import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import Field from "./Field";

const ImgSubForm = ({url, errorUrl, errorCaption, handle, caption, num, deleteImg, changeCaption, changeUrl}) => {
    return (

        <div className="card mt-3 mb-4">
            <div className="card-body">
                <div className="icons d-flex justify-content-between mx-2 my-2">
                    <h2 className="h2">Image n°{num + 1}</h2>
                    <div className="icons-container d-flex">
                        {num < 1 &&
                            <>
                                <div className="icon" onClick={() => deleteImg(num)}>
                                    <FontAwesomeIcon icon={faTrash} color="red"
                                                     style={{fontSize: "20px", margin: "2px 5px 0 5px", cursor: "pointer"}}/>
                                </div>
                                <div className="icon" onClick={handle}>
                                    <FontAwesomeIcon icon={faPlus} color="blue"
                                                     style={{fontSize: "20px", margin: "2px 5px 0 5px", cursor: "pointer"}}/>
                                </div>

                            </>


                        }

                    </div>
                </div>
                <Field
                    label="Url de l'image principale"
                    value={url}
                    placeholder="Url de votre image"
                    name={"images["+num+"].url"}
                    onChange={changeUrl}
                    error={errorUrl}
                />
                <Field
                    label="Légende de l'image"
                    value={caption}
                    placeholder="Décrivez brievement votre image"
                    name={"images["+num+"].caption"}
                    onChange={changeCaption}
                    error={errorCaption}
                />
            </div>
        </div>
    );
};

export default ImgSubForm;