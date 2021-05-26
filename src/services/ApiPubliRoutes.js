const api = 'http://localhost:5000/api/publications'
const axios = require('axios').default;

class ApiPubliRoutes {
    getAllPublications = async (data) => {
        const payload = data.payload;
        const authpayload = data.authpayload;
        try {
            const response = await axios.get(api + '/',  payload, {
                params: {
                    userId: authpayload.userId,
                    token: authpayload.authToken
                }
            });
            return response;
        } catch (error) {
            return error;
        }
    }
}

export default new ApiPubliRoutes();