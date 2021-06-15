const api = 'http://localhost:5000/api/auth'
const axios = require('axios').default;

class ApiUserRoutes {
    signupNewUser = async (data) => {
        try {
            const response = await axios.post(api + '/signup', { data });
            return response;
        } catch (error) {
            return(error);
        }
    }

    loginUser = async (data) => {
        try {
            const response = await axios.post(api + '/login', { data });
            return response;
        } catch (error) {
            return(error);
        }
    }

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

    // le payload contient un objet data qui contient les données à entrer dans la BDD ainsi que userId et un objet authToken qui sert à s'authentifier à placer dans les paramètres de la query
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