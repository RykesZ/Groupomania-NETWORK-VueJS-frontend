const api = 'http://localhost:5000/api/auth'

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
}




export default new ApiUserRoutes();