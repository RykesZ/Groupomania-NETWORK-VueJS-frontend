const api = 'http://localhost:5000/api/publications'
const axios = require('axios').default;

class ApiPubliRoutes {
    getAllPublications = async (data) => {
        console.log("until there");
        const payload = data.payload;
        console.log(payload);
        const authPayload = data.authPayload;
        console.log(authPayload);
        try {
            console.log("rightbeforereq");
            const response = await axios.get(api + '/', {
                params: {
                    userId: authPayload.userId,
                    token: authPayload.token,
                    pageNumber: payload.pageNumber
                }
            });
            console.log(response);
            return response;
        } catch (error) {
            return error;
        }
    }
}

export default new ApiPubliRoutes();