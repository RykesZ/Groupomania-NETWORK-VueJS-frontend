const api = 'http://localhost:5000/api/publications'
const axios = require('axios').default;

class ApiPubliRoutes {

    // Envoie la requête HTTP permettant à un utilisateur de créer une publication
    createPublication = async (data, file, authPayload) => {
        const formData = new FormData();
        formData.append('userId', data.userId);
        formData.append('text', data.text);
        formData.append('file', file);
        try {
            const response = await axios.post(api + '/',
            formData, {
                params: {
                    userId: authPayload.userId,
                    token: authPayload.token
                },
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response;
        } catch (error) {
            return(error);
        }
    }

    // Envoie la requête HTTP permettant de récupérer les infos d'une seule publication
    getOnePublication = async (data, authPayload) => {
        const pubId = data.pubId;
        try {
            const response = await axios.get(api + `/${pubId}`, {
                params: {
                    userId: authPayload.userId,
                    token: authPayload.token
                }
            });
            //console.log(response);
            return response;
        } catch (error) {
            return error;
        }
    };

    // Envoie la requête HTTP permettant de récupérer les 10 publications correspondant au numéro de la page associé
    getAllPublications = async (data, authPayload) => {
        //console.log("until there");
        //console.log(authPayload);
        try {
            //console.log("rightbeforereq");
            const response = await axios.get(api + '/', {
                params: {
                    userId: authPayload.userId,
                    token: authPayload.token,
                    pageNumber: data.pageNumber
                }
            });
            //console.log(response);
            return response;
        } catch (error) {
            return error;
        }
    }

    // Envoie la requête HTTP permettant à un utilisateur de like/dislike une publication
    likePublication = async (data, authPayload) => {
        const pubId = data.pubId;
        const like = data.like;
        const formData = new FormData();
        try {
            const response = await axios.post(api + `/${pubId}/like/${like}`, formData, {
                params: {
                    userId: authPayload.userId,
                    token: authPayload.token
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response;
        } catch (error) {
            return error;
        }
    }

    // Envoie la requête HTTP permettant à un utilisateur de supprimer une publciation
    deletePublication = async (data, authPayload) => {
        const pubId = data.pubId;
        //console.log({"pubId": data.pubId})
        try {
            const response = await axios.delete(api, {
                params: {
                    userId: authPayload.userId,
                    token: authPayload.token,
                    pubId
                }
            });
            return response;
        } catch (error) {
            return error;
        }
    }

    // Envoie la requête HTTP permettant à un utilisateur de modifier une publication
    modifyPublication = async (data, file, authPayload) => {
        const formData = new FormData();
        const pubId = data.pubId
        formData.append('userId', data.userId);
        formData.append('text', data.text);
        formData.append('removeFile', data.removeFile)
        formData.append('file', file);
        try {
            const response = await axios.put(api + `/${pubId}`,
            formData, {
                params: {
                    userId: authPayload.userId,
                    token: authPayload.token
                },
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response;
        } catch (error) {
            return(error);
        }
    }
}


    

export default new ApiPubliRoutes();