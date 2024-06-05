import axios from "axios";

const BASE_URL = 'http://localhost:3000'

const registerUserService = (data) => axios.post(`${BASE_URL}/register`, data)

const loginUserService = (data) => axios.post(`${BASE_URL}/login`, data)

const getUserService = (jwtToken) => axios.get(`${BASE_URL}/users/me`,{headers: {Authorization:`Bearer ${jwtToken}`}})
export {
    registerUserService,
    loginUserService,
    getUserService
}