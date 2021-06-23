const api = 'http://localhost:5000/api/auth'
const axios = require('axios').default;

class ApiUserRoutes {
    // Envoie la requête HTTP permettant à un nouvel utilisateur de s'inscrire
    signupNewUser = async (data) => {
        try {
            const response = await axios.post(api + '/signup', { data });
            return response;
        } catch (error) {
            return(error);
        }
    }

    // Envoie la requête HTTP permettant à un utilisateur de se connecter à l'application
    loginUser = async (data) => {
        try {
            const response = await axios.post(api + '/login', { data });
            return response;
        } catch (error) {
            return(error);
        }
    }

    // Envoie la requête HTTP permettant de récupérer les informations d'un utilisateur
    getUserInfo = async (payload) => {
        try {
            const response = await axios.get(api + '/info', {
                params: {
                    userId: payload.userId,
                    token: payload.token
                },
            });
            if (response.request.readyState === 4) {
                if (response.status  === 200 || response.status === 201) {
                    //console.log(response);
                    return(response);
                }
            }
        } catch (error) {
            return(error);
        }
    }

    // Envoie la requête HTTP permettant à un utilisateur de modifier ses données personnelles
    updateUser = async (payload, file) => {
        const data = payload.data;
        let dataKeys = Object.keys(data);
        const formData = new FormData();
        //console.log(dataKeys);
        for (let i = 0; i < dataKeys.length; i++) {
            //console.log(data[dataKeys[i]]);
            formData.append(dataKeys[i], data[dataKeys[i]]);
        }
        formData.append('file', file);
        //console.log(file);

        //console.log(payload.data);
        //console.log(payload.authToken);
        try {
            const response = await axios.put(api + '/modify',
                formData, {
                params: {
                    userId: payload.data.userId,
                    token: payload.authToken
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

    // Envoie la requête HTTP permettant à un utilisateur de supprimer son compte
    deleteUser = async (payload) => {
        try {
            const response = await axios.delete(api + '/delete', {
                params: {
                    userId: payload.userId,
                    token: payload.authToken,
                    deletePubAndComms: payload.deletePubAndComms
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

export default new ApiUserRoutes();