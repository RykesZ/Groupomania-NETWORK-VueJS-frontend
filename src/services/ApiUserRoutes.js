const api = 'http://localhost:5000/api/auth'

const makeRequest = (verb, url, data) => {
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
        if (verb === 'POST' || verb === 'PUT') {
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


}




export default new ApiUserRoutes();