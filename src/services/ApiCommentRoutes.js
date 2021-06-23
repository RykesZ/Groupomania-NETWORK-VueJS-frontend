const api = 'http://localhost:5000/api/comments'
const axios = require('axios').default;

class ApiCommentRoutes {

    // Envoie la requête HTTP permettant à un utilisateur de créer un commentaire associé à une publication
    createComment = async (data, authPayload) => {
        const formData = new FormData();
        formData.append('text', data.text);
        formData.append('pubId', data.pubId);
        formData.append('userId', data.userId);
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

    // Envoie la requête HTTP permettant de récupérer tous les commentaires d'une publication
    getAllComments = async (data, authPayload) => {
        const pubId = data.pubId;
        //console.log(pubId);
        try {
            const response = await axios.get(api + `/${pubId}`, {
                params: {
                    userId: authPayload.userId,
                    token: authPayload.token,
                }
            });
            //console.log(response);
            return response;
        } catch (error) {
            return error;
        }
    }

    // Envoie la requête HTTP permettant à un utilisateur de supprimer un commentaire
    deleteComment = async (data, authPayload) => {
        const commId = data.commId;
        //console.log({"commId": data.commId})
        try {
            const response = await axios.delete(api, {
                params: {
                    userId: authPayload.userId,
                    token: authPayload.token,
                    commId
                }
            });
            return response;
        } catch (error) {
            return error;
        }
    }

    // Envoie la requête HTTP permettant à un utilisateur de modifier un commentaire
    modifyComment = async (data, authPayload) => {
        const formData = new FormData();
        const commId = data.commId;
        formData.append('text', data.text);
        formData.append('userId', data.userId);
        try {
            const response = await axios.put(api + `/${commId}`,
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

export default new ApiCommentRoutes();