import axios from "axios";
import { API_URL } from '@/api/config';

const registerUserService = (data) => axios.post(`${API_URL}/register`, data);
const loginUserService = (data) => {
  console.log("Datos enviados al login:", data);
 return axios.post(`${API_URL}/login`, data);
};

const getUserService = (jwtToken) =>
  axios.get(`${API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${jwtToken}` },
  });
export { registerUserService, loginUserService, getUserService };
