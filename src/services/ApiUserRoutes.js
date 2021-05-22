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
                    console.log(response);
                    return(response);
                }
            }
        } catch (error) {
            return(error);
        }
    }

    // le paylaod contient un objet data qui contient les données à entrer dans la BDD ainsi que userId et un objet authToken qui sert à s'authentifier à placer dans les paramètres de la query
    updateUser = async (payload, file) => {
        const data = payload.data;
        let dataKeys = Object.keys(data);
        let formData = new FormData();
        console.log(dataKeys);
        for (let i = 0; i < dataKeys.length; i++) {
            console.log(data[dataKeys[i]]);
            formData.append(dataKeys[i], data[dataKeys[i]]);
        }
        formData.append('file', file)
        console.log(file);

        console.log(payload.data);
        console.log(payload.authToken);
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
                    userId: payload.data.userId,
                    token: payload.authToken,
                    deletePubAndComms: payload.deletePubAndComms
                }
            });
            return response;
        } catch (error) {
            return(error);
        }
    }
}

/*
const makeRequest = (verb, url, data, token) => {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open(verb, url);
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status === 200 || request.status === 201) {
                    resolve(JSON.parse(request.response));
                } else {
                    reject(JSON.parse(request.response));
                }
            }
        };
        console.log(token);
        if (token) {
            request.setRequestHeader("Authorization", 'Bearer' + ' ' + token);
        }
        if (data) {
            console.log(data)
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify(data));
        } else {
            request.send();
        }
    });
};


class ApiUserRoutes {
    signupNewUser = async (data) => {
        const requestPromise = makeRequest('POST', api + '/signup', data);
        const signupConfirmation = await requestPromise;
        return signupConfirmation;
    }

    loginUser = async (data) => {
        const requestPromise = makeRequest('POST', api + '/login', data);
        const loginConfirmation = await requestPromise;
        return loginConfirmation;
    }

    getUserInfo = async (payload) => {
        const authToken = payload.token;
        const data = {
            userId: payload.userId
        }
        console.log(payload.token);
        console.log(data);
        const requestPromise = makeRequest('POST', api + '/info', data, authToken);
        const userInfo = await requestPromise;
        return userInfo;
    }

    updateUser = async (payload) => {
        const authToken = payload.authToken;
        const data = payload.data;
        const requestPromise = makeRequest('PUT', api + '/modify', data, authToken);
        const updateConfirmation = await requestPromise;
        return updateConfirmation;
    }

    deleteUser = async (payload) => {
        const authToken = payload.authToken;
        const data = {
            userId: payload.userId
        }
        const requestPromise = makeRequest('DELETE', api + '/delete', data, authToken);
        const deleteConfirmation = await requestPromise;
        return deleteConfirmation;
    }
}
*/



export default new ApiUserRoutes();