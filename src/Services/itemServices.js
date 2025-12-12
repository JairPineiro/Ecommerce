import axios from "axios";
import { API_URL } from '@/api/config';

const getAllItemsService = () => axios.get(`${API_URL}/items`)

const getOneItemService = (id) => axios.get(`${API_URL}/items/${id}`)

const createItemService = (data, jwtToken) => axios.post(`${API_URL}/items`,data, 
{headers: {Authorization:`Bearer ${jwtToken}`}})

export {
    getAllItemsService,
    getOneItemService,
    createItemService
}