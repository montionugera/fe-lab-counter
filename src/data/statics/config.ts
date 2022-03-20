const environment = process.env.NODE_ENV
const userServiceURL = process.env.userServiceURL
export default {
    NODE_ENV: environment,
    USER_SERVICE_END_POINT: 'localhost:3000',
    customKey: process.env.customKey,
    fbLoginURL: `${userServiceURL}/auth/get-facebook-token`,
    userServiceURL: `${userServiceURL}`,
    appURL: process.env.appURL,
}
