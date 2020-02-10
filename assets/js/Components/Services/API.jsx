import Axios from "axios";

const findAll = () => {
    return Axios.get("https://127.0.0.1:8000/api/annonces")
        .then(response => response.data["hydra:member"])
};

export default {
    findAll
};