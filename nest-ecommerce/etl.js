const axios = require('axios');
require('dotenv/config');

(async () => {

    try {


        const {
            data
        } = await axios.post(`http://localhost:${process.env.APP_PORT || 3000}/auth/register`, {
            username: 'username',
            password: 'password',
            seller: true,
        })

        console.log('Register request result:',
            data);

        // const {
        //     token
        // } = data;

        // const {
        //     data: res2
        // } = await axios.get(
        //     'http://localhost:3000/api/product/mine', {
        //         headers: {
        //             authorization: `Bearer ${token}`
        //         },
        //     }, );

        // console.log(res2)

    } catch (error) {
        console.log('Exception: ', error);
    }

})()